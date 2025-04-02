import axios from 'axios';
import {BACK_URL} from '../../../shared/Consts/URLS'
import {ProfileType} from '../../../pages/Profile/ui/ProfileTypes'
import {UserResponse} from '../../../entity/User/api/User'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CODE_CREATED, CODE_OK } from '../../../shared/Consts/Codes';
import { AuthRequest, RegisterRequest } from '../../../shared/Consts/Interfaces';

const userMock: ProfileType = {
    id: "67e3b36b9a36154096b4bbea",
    username: 'Shkaf Unichtojitel',
    avatar_url: '/Profile/avatar.png',
    bio: '[!i for i in [‘Красивый’, ‘Умный’, ‘Обаятельный’, ‘Спортсмен’]]',
    skills_to_learn: [
        {
            name: 'Figma',
            description: '',
            level: 'intermediate',
        },
        {
            name: 'Nginx',
            description: '',
            level: 'beginner',
        },
        {
            name: 'Docker',
            description: '',
            level: 'advanced',
        },
        {
            name: 'JavaScript',
            description: '',
            level: 'advanced',
        },
    ],
    skills_to_share: [
        {
            name: 'Kafka',
            description: '',
            level: 'beginner',
        },
        {
            name: 'Networks',
            description: '',
            level: 'advanced',
        },
    ],
    email: "ok",
    created_at: "2025-01-03T00:00:00Z",
    updated_at: "2025-01-03T00:00:00Z",
    last_active_at: "2025-01-03T00:00:00Z",
    preferred_format: "voice",
}

export const TryAuth = createAsyncThunk(
    'auth/tryAuth',
    async ({username, password}: AuthRequest) => {
        console.log('op');
        const response = await (new Promise((resolve) => {
            setTimeout(() => {
                console.log('aga');
                resolve(userMock);
            }, 2000)
        }));

        return {user: response as ProfileType, status: 200};

        // const response = await axios.post(BACK_URL, JSON.stringify({password, username}));

        // callback({user: response.data as ProfileType, status: response.status});
    }
);

const avatarURLMock: string = 'http://lolkek.com/ava.jpeg';

export const LoadAvatar = createAsyncThunk(
    'auth/loadAvatar',
    async (avatar: File) => {
        const response = await (new Promise((resolve) => {
            setTimeout(() => {
                console.log('aga');
                resolve(avatarURLMock);
            }, 2000);
        }));

        return {avatarURL: response, status: CODE_OK};

        // const formData = new FormData();
        // formData.append('file', avatar, avatar.name);

        // const {status, data} = await axios.post(BACK_URL + '/file/temp', formData, {
        //     headers: {
        //         "Content-Type": "mulpipart/form-data",
        //     }
        // });

        // return {avatarURL: data as string, status};
    }
);

export const TryRegister = createAsyncThunk(
    'auth/tryRegister',
    async ({username, password, email, avatar_url, preferred_format}: RegisterRequest) => {
        console.log('op');

        const response = await (new Promise((resolve) => {
            setTimeout(() => {
                console.log('asjdkas');
                resolve(userMock);
            }, 2000)
        }));

        return {user: response as ProfileType, status: CODE_CREATED};

        // const response = await axios.post(BACK_URL + '/users', JSON.stringify({password, username, email, avatar_url, preferred_format, skills_to_learn, skills_to_share}));

        // return {user: response.data as ProfileType, status: response.status};
    }
)