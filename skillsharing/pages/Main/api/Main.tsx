import { createAsyncThunk } from '@reduxjs/toolkit';
import {ProfileType} from '../../Profile/ui/ProfileTypes'
import axios from 'axios';

const userMock: ProfileType[] = [{
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
            name: 'Docker',
            description: '',
            level: 'intermediate',
        },
        {
            name: 'C++',
            description: '',
            level: 'beginner',
        },
        {
            name: 'Python',
            description: '',
            level: 'advanced',
        },
        {
            name: 'Anime',
            description: '',
            level: 'advanced',
        },
    ],
    email: "ok",
    created_at: "2025-01-03T00:00:00Z",
    updated_at: "2025-01-03T00:00:00Z",
    last_active_at: "2025-01-03T00:00:00Z",
    preferred_format: "voice",
}];

export const GetMatchedUsers = createAsyncThunk(
    'main/getMatchedUsers',
    async (userID: string) => {
        const response = await (new Promise((resolve) => {
            setTimeout(() => {
                resolve([...userMock,...userMock,...userMock,...userMock, ...userMock, ...userMock, ...userMock, ...userMock, ...userMock]);
            }, 2000)
        }));

        return response;
    
        // const {status, data} = await axios.get(`http://localhost:3001/api/v1/users/match/${userID}`);
    
        // if (status === 200) {
        //     callback(data as ProfileType[]);
        // }
    }
);