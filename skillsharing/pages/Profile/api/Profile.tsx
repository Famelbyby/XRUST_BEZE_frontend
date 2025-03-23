import { ProfileType } from "../ui/ProfileTypes";

const userMock: ProfileType = {
    id: 2,
    name: 'Shkaf Unichtojitel',
    avatar: '/Profile/avatar.png',
    description: '[!i for i in [‘Красивый’, ‘Умный’, ‘Обаятельный’, ‘Спортсмен’]]',
    tags: [
        'Figma',
        'Nginx',
        'Docker',
        'JavaScript',
    ],
    rating: 12,
    helps: 23,
    rate: 4.8,
    lastSeen: 'Вчера',
    hrefs: [
        'https://github.com',
        'https://vk.com',
        'https://stackoverflow'
    ],
    feedbacks: [],
}

export async function GetProfile (userID: number, callback: (profileData: ProfileType) => void) {
    (new Promise((resolve) => {
        setTimeout(() => {
            resolve(userMock);
        }, 2000)
    })).then((profileData) => {
        (profileData as ProfileType).id = userID;
        callback(profileData as ProfileType);
    });
};