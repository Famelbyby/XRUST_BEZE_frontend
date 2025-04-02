import { createAsyncThunk } from '@reduxjs/toolkit';
import {ProfileType} from '../../../pages/Profile/ui/ProfileTypes'
import axios from 'axios';
import { BACK_URL } from '../../../shared/Consts/URLS';
import { CODE_OK } from '../../../shared/Consts/Codes';

const notAuthedUserMock: ProfileType | undefined = undefined;

const userMock: ProfileType = {
    id: "67ed4e0a66ab0aab711f8476",
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

export const GetUserByCookie = createAsyncThunk(
    'users/getUserByCookie',
    async () => {
        const response = await (new Promise((resolve) => {
            setTimeout(() => {
                resolve(userMock);
            }, 20)
        }));

        return {user: response as ProfileType, status: CODE_OK};

        // const {status, data} = await axios.get(BACK_URL + `/auth`, 
        //     {
        //         withCredentials: true,
        //     }
        // );

        // switch(status) {
        //     case CODE_OK:
        //         return {user: data as ProfileType, status};
        //     case 404:
        //     default:
        //         return {user: undefined, status};
        // }
    }
);