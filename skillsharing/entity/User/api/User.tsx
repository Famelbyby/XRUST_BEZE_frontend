import {ProfileType} from '../../../pages/Profile/ui/ProfileTypes'
import { createAsyncThunk } from '@reduxjs/toolkit';

const notAuthedUserMock: ProfileType | undefined = undefined;

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

export const GetUser = createAsyncThunk(
  'users/fetchUser',
  async(userID: string) => {
    console.log('op');
    const response = await (new Promise((resolve) => {
        setTimeout(() => {
            console.log('aga');
            resolve(userMock);
        }, 2000)
    }));

    return response;

    // const {status, data} = await axios.get(`http://localhost:3001/api/v1/users/${userID}`);

    // if (status === 200) {
    //     callback(data as ProfileType);
    // }
  }
);