import axios from 'axios';
import {BACK_URL} from '../../../shared/Consts/URLS'
import {ProfileType} from '../../../pages/Profile/ui/ProfileTypes'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthRequest, Category, LoadAvatarRequest, RegisterRequest } from '../../../shared/Consts/Interfaces';
import { CODE_OK } from '../../../shared/Consts/Codes';

export const TryAuth = createAsyncThunk(
    'auth/tryAuth',
    async ({username, password, email}: AuthRequest) => {
        let status: number = 200;
        let data: unknown;
        let error: string | undefined;

        await axios.post(BACK_URL + '/auth/login', JSON.stringify({password, email, username})).then((response) => {
            status = response.status;
            data = response.data;
            error = undefined;
        }).catch(({response}) => {
            status = response.status;
            data = undefined;
            error = response.data.error;
        });

        return {user: data as ProfileType, status, error};
    }
);

export const LoadAvatar = createAsyncThunk(
    'auth/loadAvatar',
    async ({avatar}: LoadAvatarRequest) => {
        const formData = new FormData();
        formData.append('file', avatar, avatar.name);

        const {status, data} = await axios.post(BACK_URL + '/file/temp', formData, {
            headers: {
                "Content-Type": "mulpipart/form-data",
            }
        });

        return {avatarURL: data.filename as string, status};
    }
);

export const TryRegister = createAsyncThunk(
    'auth/tryRegister',
    async ({username, password, email, avatar_url, preferred_format, bio, skills_to_learn, skills_to_share, hrefs}: RegisterRequest) => {
        let status: number = CODE_OK;
        let data: unknown;
        let error: string | undefined;

        await axios.post(BACK_URL + '/auth/register', 
            JSON.stringify({password, username, email, avatar: avatar_url, preferred_format, bio, skills_to_learn, skills_to_share, hrefs})
        ).then((response) => {
            status = response.status;
            data = response.data;
            error = undefined;
        }).catch(({response}) => {
            status = response.status;
            data = undefined;
            error = response.data;
        })

        return {user: data as ProfileType, status, error};
    }
)

export const GetCategories = createAsyncThunk(
    'auth/getCategories', 
    async () => {
        let status: number = CODE_OK;
        let data: unknown;
        let error: string | undefined;

        await axios.get(BACK_URL + '/skills').then((response) => {
            status = response.status;
            data = response.data;
            error = undefined;
        }).catch(({response}) => {
            status = response.status;
            data = undefined;
            error = response.data;
        });

        return {categories: data as Category[], status: status, error};
    }
)