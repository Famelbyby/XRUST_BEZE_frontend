import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {DialogItem} from '../../entity/Dialog/ui/DialogTypes'
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes'
import { Skill } from '../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes'
import { GetDialogs } from '../../pages/Dialogs/api/Dialogs'
import { DialogsResponse } from '../../shared/Consts/Interfaces'
import { CODE_OK } from '../../shared/Consts/Codes'

export interface DialogsState {
  dialogs: DialogItem[] | undefined,
  filteredDialogs: DialogItem[] | undefined,
}

const initialState: DialogsState = {
  dialogs: undefined,
  filteredDialogs: undefined,
}

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    filterDialogs: (state: DialogsState, action: PayloadAction<{selectedTags: string[], user: ProfileType}>) => {
      const {selectedTags, user} = action.payload;
      
      if (selectedTags.length === 0) {
        state.filteredDialogs = state.dialogs;

        return;
      }

      if (state.dialogs !== undefined) {
        state.filteredDialogs = state.dialogs.filter((dialog: DialogItem) => {
          if (user === undefined) {
            return;
          }
  
          const dialogCompanion: ProfileType | undefined = dialog.users.find((dialogUser: ProfileType) => dialogUser.id !== user.id);
  
          if (dialogCompanion === undefined) {
            return true;
          }
  
          let isFiltered = false;
  
          selectedTags.forEach((selectedTag: string) => {
            isFiltered = isFiltered || (dialogCompanion.skills_to_share.find((skill: Skill) => skill.name === selectedTag) !== undefined);
          });
  
          return isFiltered;
        });
      }
    },
    clearAll: (state: DialogsState) => {
      state.dialogs = undefined;
      state.filteredDialogs = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetDialogs.fulfilled, (state: DialogsState, action) => {
      const data = action.payload as DialogsResponse;

      if (data.status !== CODE_OK) {
        return;
      }

      if (data.dialogs === null) {
        data.dialogs = [];
      }

      const newDialogs: DialogItem[] = data.dialogs;

      state.dialogs = newDialogs.filter((dialog: DialogItem) => dialog.last_message !== null);
      state.filteredDialogs = state.dialogs;
    });
  },
})

export const { filterDialogs, clearAll } = dialogsSlice.actions

export default dialogsSlice.reducer