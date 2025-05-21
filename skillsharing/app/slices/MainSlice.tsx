import { createSlice } from '@reduxjs/toolkit';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import {
    GetFoundByNameUsers,
    GetFoundBySkillsUsers,
    GetMatchedUsers,
} from '../../pages/Main/api/Main';
import { CategoryResponse, MatchedUsersResponse } from '../../shared/Consts/Interfaces';
import { CODE_OK } from '../../shared/Consts/Codes';
import { GetCategories } from '../../pages/Auth/api/Auth';

export interface MainState {
    foundUsers: ProfileType[] | undefined;
    globalSkills: string[];
}

const initialState: MainState = {
    foundUsers: undefined,
    globalSkills: [],
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        clearFoundUsers: (state: MainState) => {
            state.foundUsers = undefined;
            state.globalSkills = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetMatchedUsers.fulfilled, (state: MainState, action) => {
                const data = action.payload as MatchedUsersResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                if (data.foundUsers === null) {
                    data.foundUsers = [];
                }

                state.foundUsers = data.foundUsers;
            })
            .addCase(GetFoundByNameUsers.fulfilled, (state: MainState, action) => {
                const data = action.payload as MatchedUsersResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                if (data.foundUsers === null) {
                    data.foundUsers = [];
                }

                state.foundUsers = data.foundUsers;
            })
            .addCase(GetFoundBySkillsUsers.fulfilled, (state: MainState, action) => {
                const data = action.payload as MatchedUsersResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                if (data.foundUsers === null) {
                    data.foundUsers = [];
                }

                state.foundUsers = data.foundUsers;
            })
            .addCase(GetCategories.fulfilled, (state: MainState, action) => {
                const data = action.payload as CategoryResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.globalSkills = data.categories;
            });
    },
});

export const { clearFoundUsers } = mainSlice.actions;

export default mainSlice.reducer;
