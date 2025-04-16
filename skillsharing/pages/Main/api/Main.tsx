import { createAsyncThunk } from '@reduxjs/toolkit';
// import {ProfileType} from '../../Profile/ui/ProfileTypes'
import axios from 'axios';
// import { CODE_OK } from '../../../shared/Consts/Codes';
import { BACK_URL, USERS_URL } from '../../../shared/Consts/URLS';
import { FindByNameUsersRequest, MatchUserRequest } from '../../../shared/Consts/Interfaces';

// const userMock: ProfileType[] = [{
//     id: "67e3b36b9a36154096b4bbea",
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
//             name: 'Docker',
//             description: '',
//             level: 'intermediate',
//         },
//         {
//             name: 'C++',
//             description: '',
//             level: 'beginner',
//         },
//         {
//             name: 'Python',
//             description: '',
//             level: 'advanced',
//         },
//         {
//             name: 'Anime',
//             description: '',
//             level: 'advanced',
//         },
//     ],
//     email: "ok",
//     created_at: "2025-01-03T00:00:00Z",
//     updated_at: "2025-01-03T00:00:00Z",
//     last_active_at: "2025-01-03T00:00:00Z",
//     preferred_format: "voice",
// }];

export const GetMatchedUsers = createAsyncThunk(
    'main/getMatchedUsers',
    async ({userId, callback}: MatchUserRequest) => {
        // const response = await (new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve([...userMock,...userMock,...userMock,...userMock, ...userMock, ...userMock, ...userMock, ...userMock, ...userMock]);
        //     }, 2000)
        // }));

        // return {foundUsers: response, status: CODE_OK};
    
        try {
            const {status, data} = await axios.get(BACK_URL + USERS_URL + `/match/${userId}`);

            callback();

            return {foundUsers: data, status: status};
        } catch(event) {
            console.log(event);
        }
    }
);

export const GetFoundByNameUsers = createAsyncThunk(
    'main/getFoundByNameUsers',
    async ({userId, query, callback}: FindByNameUsersRequest) => {
        try {
            const {status, data} = await axios.get(BACK_URL + USERS_URL + `/by-name?username=${query}&user_id=${userId}`);

            callback();

            return {foundUsers: data.users, status: status};
        } catch(event) {
            console.log(event);
        }
    }
)