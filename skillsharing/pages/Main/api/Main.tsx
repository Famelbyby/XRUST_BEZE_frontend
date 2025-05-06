import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_URL, USERS_URL } from '../../../shared/Consts/URLS';
import { FindByNameUsersRequest, MatchUserRequest } from '../../../shared/Consts/Interfaces';
import { CODE_OK } from '../../../shared/Consts/Codes';

export const GetMatchedUsers = createAsyncThunk(
    'main/getMatchedUsers',
    async ({ userId }: MatchUserRequest) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        await axios
            .get(BACK_URL + USERS_URL + `/match/${userId}`)
            .then((response) => {
                status = response.status;
                data = response.data;
                error = undefined;
            })
            .catch(({ response }) => {
                status = response.status;
                data = undefined;
                error = response.data;
            });

        return { foundUsers: data, status: status, error };
    },
);

export const GetFoundByNameUsers = createAsyncThunk(
    'main/getFoundByNameUsers',
    async ({ userId, query }: FindByNameUsersRequest) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        await axios
            .get(BACK_URL + USERS_URL + `/by-name?username=${query}&user_id=${userId}`)
            .then((response) => {
                status = response.status;
                data = response.data.users;
                error = undefined;
            })
            .catch(({ response }) => {
                status = response.status;
                data = undefined;
                error = response.data;
            });

        return { foundUsers: data, status: status, error };
    },
);

export const GetFoundBySkillsUsers = createAsyncThunk(
    'main/getBySkills',
    async (skills: string[]) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        const concatSkills = skills.map((skill) => `skill=${skill}`).join('&');

        await axios
            .get(BACK_URL + USERS_URL + `/by-skills-to-share?limit=1000&offset=0&${concatSkills}`)
            .then((response) => {
                status = response.status;
                data = response.data.users;
                error = undefined;
            })
            .catch(({ response }) => {
                status = response.status;
                data = undefined;
                error = response.data;
            });

        return { foundUsers: data, status: status, error };
    },
);
