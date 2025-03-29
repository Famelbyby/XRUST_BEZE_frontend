import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes'
import { Skill } from '../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes'
import { GetMatchedUsers } from '../../pages/Main/api/Main'

export interface MainState {
  foundUsers: ProfileType[] | undefined,
  filteredUsers: ProfileType[] | undefined,
}

const initialState: MainState = {
  foundUsers: undefined,
  filteredUsers: undefined,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    clearFoundUsers: (state: MainState) => {
      state.foundUsers = state.filteredUsers = undefined;
    },
    filterUsers: (state: MainState, action: PayloadAction<string[]>) => {
        const tags: string[] = action.payload;

        if (tags.length === 0) {
            state.filteredUsers = state.foundUsers;
            return;
        }

        if (state.foundUsers !== undefined) {
          const sortedUsers: ProfileType[] = [];

          state.foundUsers.forEach((foundUser: ProfileType) => {
              let isFiltered: boolean = true;
  
              tags.forEach((tag: string) => {
                  if (foundUser.skills_to_share.find((skill: Skill) => skill.name === tag) === undefined) {
                      isFiltered = false;
                  }
              });
  
              if (isFiltered) {
                  sortedUsers.push(foundUser);
              }
          });
  
          state.filteredUsers = sortedUsers;
        }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMatchedUsers.fulfilled, (state: MainState, action) => {
      state.foundUsers = action.payload as ProfileType[];
      state.filteredUsers = state.foundUsers;
    });
  },
})

export const { clearFoundUsers, filterUsers } = mainSlice.actions

export default mainSlice.reducer