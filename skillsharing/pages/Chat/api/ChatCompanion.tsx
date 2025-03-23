import { ICompanion } from "../ui/ChatHeader/ChatHeaderTypes";

const companionMock: ICompanion = {
    userID: 2,
    avatar: '/Chat/mate.png',
    name: 'Michael Portman',
    isOnline: true,
}

export async function GetChatCompanion(companionID: number, callback: (companionData: ICompanion) => void) {
    (new Promise((resolve) => {
        setTimeout(() => {
            resolve(companionMock);
        }, 3000);
    })).then((companionData) => {
        callback(companionData as ICompanion);
    });
}