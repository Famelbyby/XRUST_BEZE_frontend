import axios from "axios";
import { ProfileType } from "../ui/ProfileTypes";

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
    skills_to_share: [],
    email: "ok",
    created_at: "2025-01-03T00:00:00Z",
    updated_at: "2025-01-03T00:00:00Z",
    last_active_at: "2025-01-03T00:00:00Z",
    preferred_format: "voice",
}

export async function GetProfile (userID: string, callback: (profileData: ProfileType) => void) {
    // (new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(userMock);
    //     }, 2000)
    // })).then((profileData) => {
    //     (profileData as ProfileType).id = userID;
    //     callback(profileData as ProfileType);
    // });

    const {status, data} = await axios.get(`http://localhost:3001/api/v1/users/${userID}`);

    if (status === 200) {
        callback(data as ProfileType);
    }
};