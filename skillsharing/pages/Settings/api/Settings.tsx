import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACK_URL, USERS_URL } from '../../../shared/Consts/URLS';
import { UpdateProfileRequest } from '../../../shared/Consts/Interfaces';
import { CODE_OK } from '../../../shared/Consts/Codes';

export const UpdateProfile = createAsyncThunk(
    'settings/updateProfile',
    async ({ user, avatar, hrefs }: UpdateProfileRequest) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        const filterHrefs = hrefs.map((href) => href !== '');

        const newAvatar: string = avatar || user.avatar;

        await axios
            .put(
                BACK_URL + USERS_URL + `/${user.id}`,
                JSON.stringify({ ...user, avatar: newAvatar, hrefs: filterHrefs }),
            )
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

        return { user: data, status: status, error };
    },
);
