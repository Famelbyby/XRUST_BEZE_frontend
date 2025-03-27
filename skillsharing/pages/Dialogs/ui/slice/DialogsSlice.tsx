import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {DialogItem} from '../../../../entity/Dialog/ui/DialogTypes'
import User from '../../../../entity/User/User'
import { ProfileType } from '../../../Profile/ui/ProfileTypes'
import { Skill } from '../../../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes'

export interface Dialogs {
  dialogs: DialogItem[],
  filteredDialogs: DialogItem[],
  selectedTags: string[],
  userID: string,
}

const initialState: Dialogs = {
  dialogs: [],
  filteredDialogs: [],
  selectedTags: [],
  userID: User.getUserID(),
}

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setSelectedTags: (state: Dialogs, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    toggleSelectedTag: (state: Dialogs, action: PayloadAction<string>) => {
      const toggledTag: string = action.payload;
      const tagIndex: number = state.selectedTags.findIndex((selectedTag: string) => selectedTag === toggledTag);

      if (tagIndex !== -1) {
        state.selectedTags = [...state.selectedTags, toggledTag];
      } else {
        state.selectedTags = [...state.selectedTags.slice(0, tagIndex), ...state.selectedTags.slice(tagIndex + 1)];
      }
    },
    setDialogs: (state: Dialogs, action: PayloadAction<DialogItem[]>) => {
      const newDialogs: DialogItem[] = action.payload;

      state.dialogs = newDialogs.filter((dialog: DialogItem) => dialog.last_message !== null);
      state.filteredDialogs = state.dialogs;
    },
    filterDialogs: (state: Dialogs) => {
      if (state.selectedTags.length === 0) {
        state.filteredDialogs = state.dialogs;

        return;
      }

      state.filteredDialogs = state.dialogs.filter((dialog: DialogItem) => {
        const dialogCompanion: ProfileType | undefined = dialog.users.find((user: ProfileType) => user.id !== state.userID);

        if (dialogCompanion === undefined) {
          return true;
        }

        let isFiltered = false;

        state.selectedTags.forEach((selectedTag: string) => {
          isFiltered = isFiltered || (dialogCompanion.skills_to_share.find((skill: Skill) => skill.name === selectedTag) !== undefined);
        });

        return isFiltered;
      });
    },
    clearAll: (state: Dialogs) => {
      state.dialogs = [];
      state.filteredDialogs = [];
      state.selectedTags = [];
    },
  },
})

export const { setSelectedTags, toggleSelectedTag, setDialogs, filterDialogs, clearAll } = dialogsSlice.actions

export default dialogsSlice.reducer