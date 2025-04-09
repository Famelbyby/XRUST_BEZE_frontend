import { createSlice } from '@reduxjs/toolkit'
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes'
import { GetUserByCookie } from '../../entity/User/api/User';
import { TryAuth, TryRegister } from '../../pages/Auth/api/Auth';
import {CODE_OK, CODE_CREATED, CODE_FORBIDDEN, CODE_NOT_AUTHED} from '../../shared/Consts/Codes';
import { UserResponse } from '../../shared/Consts/Interfaces';
import { GetProfile } from '../../pages/Profile/api/Profile';
import { UpdateProfile } from '../../pages/Settings/api/Settings';

export interface UserState {
  user: ProfileType | undefined;
  isFetched: boolean,
}

const initialState: UserState = {
    user: undefined,
    isFetched: false,
}

export const userSlice = createSlice({
  name: 'structurizedMessage',
  initialState,
  reducers: {
    clearUser: (state: UserState) => {
        state.user = undefined;
        state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUserByCookie.fulfilled, (state: UserState, action) => {
      const data = action.payload as UserResponse;

      if (data.status !== CODE_OK && data.status !== CODE_FORBIDDEN && data.status !== CODE_NOT_AUTHED) {
        return;
      }

      state.isFetched = true;
      state.user = data.user;
    }).addCase(GetProfile.fulfilled, (state: UserState, action) => {
      const data = action.payload as UserResponse;

      if (data.status !== CODE_OK) {
        return;
      }

      // const profile = data.user;

      // // if (profile !== undefined && state.user && profile.id === state.user.id) {
      // //   state.user = profile;
      // // }
    }).addCase(TryAuth.fulfilled, (state: UserState, action) => {
      const data = action.payload as UserResponse;
      
      if (data.status === CODE_OK) {
        state.user = data.user;
      }
      
      state.isFetched = true;
    }).addCase(TryRegister.fulfilled, (state: UserState, action) => {
      const data = action.payload as UserResponse;

      if (data.status === CODE_CREATED) {
        state.user = data.user;
      }
      
      state.isFetched = true;
    }).addCase(UpdateProfile.fulfilled, (state: UserState, action) => {
      const data = action.payload as UserResponse;

      if (data.status !== CODE_OK) {
        return;
      }

      state.user = data.user;
    });
  },
})

export const { clearUser } = userSlice.actions

export default userSlice.reducer