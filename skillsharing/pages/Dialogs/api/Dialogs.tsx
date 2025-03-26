import axios from "axios";
import User from "../../../entity/User/User";
import { DialogItem } from "../../../widgets/Dialog/ui/DialogTypes";
import { BACK_URL } from "../../../shared/Consts/NetworkConsts";

const CHAT_URL = '/chat';

const dialogsMock: DialogItem[] = [
    {
        id: "67e3b3869a36154096b4bbeb",
        name: "Michael Portman",
        avatar: "/Dialogs/mate.png",
        time: 0,
        seen: false,
        text: "Ну короче там эту штуку туда сюда и балдёж",
        tags: [
            'Docker',
            'Kafka',
        ],
    }
];

export async function GetDialogs(userID: string, callback: (dialogsData: DialogItem[]) => void) {
    (new Promise((resolve) => {
        setTimeout(() => {
            resolve(dialogsMock);
        }, 2000);
    })).then((dialogsData) => {
        callback(dialogsData as DialogItem[]);
    })

    // const {status, data} = await axios.get(BACK_URL + CHAT_URL + `/${companionID}`);

    // console.log(status, data);

    // if (status === 200) {
    //     callback(data?.messages as IMessage[]);
    // }
}