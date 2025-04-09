import axios from 'axios';
import {BACK_URL} from '../../../shared/Consts/URLS'
import {ProfileType} from '../../../pages/Profile/ui/ProfileTypes'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CODE_CREATED, CODE_OK } from '../../../shared/Consts/Codes';
import { AuthRequest, Category, LoadAvatarRequest, RegisterRequest } from '../../../shared/Consts/Interfaces';

const userMock: ProfileType = {
    id: localStorage.getItem('user-id') || "67ed4e0a66ab0aab711f8476",
    username: 'Shkaf Unichtojitel',
    avatar: '/Profile/avatar.png',
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

        const response = await (new Promise((resolve) => {
            setTimeout(() => {
                resolve(userMock);
            }, 2000)
        }));

        return {user: response as ProfileType, status: 200};

        // try {
        //     const {status, data} = await axios.post(BACK_URL + '/auth/login, JSON.stringify({password, username}));

        //     return {user: data as ProfileType, status};
        // } catch(event) {
        //     console.log(event);
        //     return {user: undefined, status};
        // }
    }
);

const avatarURLMock: string = 'http://lolkek.com/ava.jpeg';

export const LoadAvatar = createAsyncThunk(
    'auth/loadAvatar',
    async ({avatar}: LoadAvatarRequest) => {
        // const response = await (new Promise((resolve) => {
        //     setTimeout(() => {
        //         console.log('aga');
        //         resolve(avatarURLMock);
        //     }, 2000);
        // }));

        // return {avatarURL: response, status: CODE_OK};

        const formData = new FormData();
        formData.append('file', avatar, avatar.name);

        const {status, data} = await axios.post(BACK_URL + '/file/temp', formData, {
            headers: {
                "Content-Type": "mulpipart/form-data",
            }
        });

        console.log(status, data);

        return {avatarURL: data.filename as string, status};
    }
);

export const TryRegister = createAsyncThunk(
    'auth/tryRegister',
    async ({username, password, email, avatar_url, preferred_format, bio, skills_to_learn, skills_to_share}: RegisterRequest) => {
        // console.log('op');

        // const response = await (new Promise((resolve) => {
        //     setTimeout(() => {
        //         console.log('asjdkas');
        //         resolve(userMock);
        //     }, 2000)
        // }));

        // return {user: response as ProfileType, status: CODE_CREATED};

        try {
            const {status, data} = await axios.post(BACK_URL + '/auth/register', JSON.stringify({password, username, email, avatar_url, preferred_format, bio, skills_to_learn, skills_to_share}));

            console.log(status, data);

            return {user: data as ProfileType, status};
        } catch(event) {
            console.log(event);
        }
    }
)

export const GetCategories = createAsyncThunk(
    'auth/getCategories', 
    async () => {
        try {
            const {status, data} = await axios.get(BACK_URL + '/skills');

            return {categories: data as Category[], status: status};
        } catch(event) {
            console.log(event);
        }
    }
)