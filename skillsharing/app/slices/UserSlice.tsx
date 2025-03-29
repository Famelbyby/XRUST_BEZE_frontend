import { createSlice } from '@reduxjs/toolkit'
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes'
import { GetUser } from '../../entity/User/api/User';

export interface UserState {
  user: ProfileType | undefined;
  isFetched: boolean,
}

const initialState: UserState = {
    user: undefined,
    isFetched: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearProfile: (state: UserState) => {
        state.user = undefined;
        state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUser.fulfilled, (state: UserState, action) => {
      state.user = action.payload as ProfileType | undefined;
      state.isFetched = true;
    });
  },
})

export const { clearProfile } = userSlice.actions

export default userSlice.reducer