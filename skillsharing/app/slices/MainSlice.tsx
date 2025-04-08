import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes'
import { GetFoundByNameUsers, GetMatchedUsers } from '../../pages/Main/api/Main'
import { MatchedUsersResponse, Skill } from '../../shared/Consts/Interfaces'
import { CODE_OK } from '../../shared/Consts/Codes'

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
      const data = action.payload as MatchedUsersResponse;

      if (data.status !== CODE_OK) {
        return;
      }

      if (data.foundUsers === null) {
        data.foundUsers = [];
      }

      state.foundUsers = data.foundUsers;
      state.filteredUsers = state.foundUsers;
    }).addCase(GetFoundByNameUsers.fulfilled, (state: MainState, action) => {
      const data = action.payload as MatchedUsersResponse;

      if (data.status !== CODE_OK) {
        return;
      }

      if (data.foundUsers === null) {
        data.foundUsers = [];
      }

      state.foundUsers = data.foundUsers;
      state.filteredUsers = state.foundUsers;
    });
  },
})

export const { clearFoundUsers, filterUsers } = mainSlice.actions

export default mainSlice.reducer