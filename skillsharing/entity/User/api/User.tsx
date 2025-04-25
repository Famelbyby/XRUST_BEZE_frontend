import { createAsyncThunk } from '@reduxjs/toolkit';
import {ProfileType} from '../../../pages/Profile/ui/ProfileTypes'
import axios from 'axios';
import { BACK_URL } from '../../../shared/Consts/URLS';
import { CODE_OK } from '../../../shared/Consts/Codes';

export const GetUserByCookie = createAsyncThunk(
    'users/getUserByCookie',
    async () => {
        let status: number = 200;
        let data: unknown;
        let error: string | undefined;

        await axios.get(BACK_URL + `/auth/validate`, 
            {
                withCredentials: true,
            }
        ).then((response) => {
            status = response.status;
            data = response.data.user;
            error = undefined;
        }).catch(({response}) => {
            status = response.status;
            data = undefined;
            error = response.data.error;
        });

        return {error, user: data as ProfileType, status};
    }
);

export const Logout = createAsyncThunk(
    'user/logout',
    async () => {
        let status: number = CODE_OK;

        await axios.post(BACK_URL + `/auth/logout`, 
            {
                withCredentials: true,
            }
        ).then((response) => {
            status = response.status;
        }).catch(({response}) => {
            status = response.status;
        });

        return {status};
    }
)