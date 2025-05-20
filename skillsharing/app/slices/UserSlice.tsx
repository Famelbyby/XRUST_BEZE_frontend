import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import { GetUserByCookie, Logout } from '../../entity/User/api/User';
import { TryAuth, TryRegister } from '../../pages/Auth/api/Auth';
import { CODE_OK, CODE_FORBIDDEN, CODE_NOT_AUTHED } from '../../shared/Consts/Codes';
import { AnyAPIResponse, UserResponse } from '../../shared/Consts/Interfaces';
import { GetProfile } from '../../pages/Profile/api/Profile';
import { UpdateProfile } from '../../pages/Settings/api/Settings';
import { LOG_IN_URL, SIGN_UP_URL } from '../../shared/Consts/URLS';

export interface UserState {
    user: ProfileType | undefined;
    isFetched: boolean;
    isCopied: boolean;
    isErrored: boolean;
    errorMessage: string | undefined;
    justResigtered: boolean;
    justLogedIn: boolean;
    firstPage: string;
}

const initialState: UserState = {
    user: undefined,
    isFetched: false,
    isCopied: false,
    isErrored: false,
    errorMessage: undefined,
    justResigtered: false,
    justLogedIn: false,
    firstPage: '',
};

export const userSlice = createSlice({
    name: 'structurizedMessage',
    initialState,
    reducers: {
        clearUser: (state: UserState) => {
            state.user = undefined;
            state.isFetched = false;
            state.justResigtered = false;
            state.justLogedIn = false;
        },
        clearFirstPage: (state: UserState) => {
            state.firstPage = '';
        },
        setIsCopied: (state: UserState, action: PayloadAction<boolean>) => {
            state.isCopied = action.payload;
        },
        setIsErrored: (
            state: UserState,
            action: PayloadAction<{ isErrored: boolean; message?: string | undefined }>,
        ) => {
            state.isErrored = action.payload.isErrored;

            if (state.isErrored) {
                state.errorMessage = action.payload.message;
            } else {
                state.errorMessage = undefined;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUserByCookie.fulfilled, (state: UserState, action) => {
                const data = action.payload as UserResponse;

                if (
                    data.status !== CODE_OK &&
                    data.status !== CODE_FORBIDDEN &&
                    data.status !== CODE_NOT_AUTHED
                ) {
                    return;
                }

                state.isFetched = true;
                state.user = data.user;

                if (!['/', '', SIGN_UP_URL, LOG_IN_URL].includes(window.location.pathname)) {
                    state.firstPage = window.location.pathname;
                }
            })
            .addCase(GetProfile.fulfilled, (state: UserState, action) => {
                const data = action.payload as UserResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.justLogedIn = state.justResigtered = false;
                const profile = data.user;

                if (profile !== undefined && state.user && profile.id === state.user.id) {
                    state.user = profile;
                }
            })
            .addCase(TryAuth.fulfilled, (state: UserState, action) => {
                const data = action.payload as UserResponse;

                if (data.status === CODE_OK) {
                    state.user = data.user;
                    state.justLogedIn = true;
                }

                state.isFetched = true;
            })
            .addCase(TryRegister.fulfilled, (state: UserState, action) => {
                const data = action.payload as UserResponse;

                if (data.status === CODE_OK) {
                    state.user = data.user;
                    state.justResigtered = true;
                }

                state.isFetched = true;
            })
            .addCase(UpdateProfile.fulfilled, (state: UserState, action) => {
                const data = action.payload as UserResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.user = data.user;
                state.justLogedIn = false;
                state.justResigtered = false;
            })
            .addCase(Logout.fulfilled, (state: UserState, action) => {
                const data = action.payload as unknown as AnyAPIResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.user = undefined;
                state.isFetched = true;
                state.justLogedIn = false;
                state.justResigtered = false;
            });
    },
});

export const { clearFirstPage, setIsErrored, setIsCopied, clearUser } = userSlice.actions;

export default userSlice.reducer;
