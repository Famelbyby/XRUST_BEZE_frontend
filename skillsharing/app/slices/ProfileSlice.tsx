import { createSlice } from '@reduxjs/toolkit';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import { UserResponse } from '../../shared/Consts/Interfaces';
import { GetProfile } from '../../pages/Profile/api/Profile';

export interface ProfileState {
    user: ProfileType | undefined;
    isFetched: boolean;
}

const initialState: ProfileState = {
    user: undefined,
    isFetched: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfile: (state: ProfileState) => {
            state.user = undefined;
            state.isFetched = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GetProfile.fulfilled, (state: ProfileState, action) => {
            const data = action.payload as UserResponse;

            state.isFetched = true;
            state.user = data.user;
        });
    },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
