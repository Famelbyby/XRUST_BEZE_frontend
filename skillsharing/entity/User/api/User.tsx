import { createAsyncThunk } from '@reduxjs/toolkit';
import {ProfileType} from '../../../pages/Profile/ui/ProfileTypes'
import axios from 'axios';
import { BACK_URL } from '../../../shared/Consts/URLS';
import { CODE_OK } from '../../../shared/Consts/Codes';
// import { UserResponse } from '../../../shared/Consts/Interfaces';

// const notAuthedUserMock: ProfileType | undefined = undefined;

// const userMock: ProfileType = {
//     id: localStorage.getItem('user-id') || "67ed4e0a66ab0aab711f8476",
//     username: 'Shkaf Unichtojitel',
//     avatar: '/Profile/avatar.png',
//     bio: '[!i for i in [‘Красивый’, ‘Умный’, ‘Обаятельный’, ‘Спортсмен’]]',
//     skills_to_learn: [
//         {
//             name: 'Figma',
//             description: '',
//             level: 'intermediate',
//         },
//         {
//             name: 'Nginx',
//             description: '',
//             level: 'beginner',
//         },
//         {
//             name: 'Docker',
//             description: '',
//             level: 'advanced',
//         },
//         {
//             name: 'JavaScript',
//             description: '',
//             level: 'advanced',
//         },
//     ],
//     skills_to_share: [
//         {
//             name: 'Kafka',
//             description: '',
//             level: 'beginner',
//         },
//         {
//             name: 'Networks',
//             description: '',
//             level: 'advanced',
//         },
//     ],
//     email: "ok",
//     created_at: "2025-01-03T00:00:00Z",
//     updated_at: "2025-01-03T00:00:00Z",
//     last_active_at: "2025-01-03T00:00:00Z",
//     preferred_format: "voice",
//     hrefs: [
//         'mail.ru',
//         'github.com',
//     ]
// }

export const GetUserByCookie = createAsyncThunk(
    'users/getUserByCookie',
    async () => {
        // const response = await (new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(userMock);
        //     }, 20)
        // }));

        // return {user: response as ProfileType, status: 200};
        let status: number = 200;
        let data: unknown;
        let error: string | undefined;

        await axios.get(BACK_URL + `/auth/validate`, 
            {
                withCredentials: true,
            }
        ).then((response) => {
            console.log('wau wau', response);

            status = response.status;
            data = response.data.user;
            error = undefined;
        }).catch(({response}) => {
            console.log('opop', response);

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

        await axios.get(BACK_URL + `/auth/logout`, 
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