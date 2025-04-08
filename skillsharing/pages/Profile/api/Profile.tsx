import axios from "axios";
import { ProfileType } from "../ui/ProfileTypes";
import { CODE_OK } from "../../../shared/Consts/Codes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, USERS_URL } from "../../../shared/Consts/URLS";

const notAuthedUserMock: ProfileType | undefined = undefined;

const userMock: ProfileType = {
    id: "67e3b36b9a36154096b4bbea",
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

export const GetProfile = createAsyncThunk(
    'profile/getProfileByID',
    async (userId: string) => {
        // const response = await (new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(userMock);
        //     }, 2000)
        // }));
        
        // callback(response as ProfileType | undefined);

        // return {user: response, status: CODE_OK};
        try {
            const {status, data} = await axios.get(BACK_URL + USERS_URL + `/${userId}`);
    
            return {user: data, status: status};
        }
        catch (event) {
            console.log(event);
            return {user: undefined, status};
        }
    }
);