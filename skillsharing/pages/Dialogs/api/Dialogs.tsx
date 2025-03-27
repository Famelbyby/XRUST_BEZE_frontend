import axios from "axios";
import { DialogItem } from "../../../entity/Dialog/ui/DialogTypes";
import { BACK_URL } from "../../../shared/Consts/NetworkConsts";

const CHAT_URL = '/chat';

const dialogsMock: DialogItem[] = [
    {
        "channel_id": "67e3b3b42214705bdbedb876",
        "user_ids": [
            "67e3b36b9a36154096b4bbea",
            "67e3b3869a36154096b4bbeb"
        ],
        "users": [
            {
                "id": "67e3b36b9a36154096b4bbea",
                "username": "xdd",
                "email": "petr09mitin@mail.d",
                "skills_to_learn": [
                    {
                        "name": "sosal",
                        "level": "advanced",
                        "description": ""
                    }
                ],
                "skills_to_share": [],
                "bio": "",
                "avatar_url": "",
                "created_at": "2025-03-26T07:57:31.91Z",
                "updated_at": "2025-03-26T07:57:31.91Z",
                "last_active_at": "2025-03-26T07:57:31.91Z",
                "preferred_format": "text"
            },
            {
                "id": "67e3b3869a36154096b4bbeb",
                "username": "xddxdd",
                "email": "petr09mitin@mail.xdd",
                "skills_to_learn": [
                    {
                        "name": "sosal",
                        "level": "advanced",
                        "description": ""
                    }
                ],
                "skills_to_share": [],
                "bio": "",
                "avatar_url": "",
                "created_at": "2025-03-26T07:57:58.253Z",
                "updated_at": "2025-03-26T07:57:58.253Z",
                "last_active_at": "2025-03-26T07:57:58.253Z",
                "preferred_format": "text"
            }
        ],
        "last_message": null,
        "created": 1742975924,
        "updated": 1742975924
    }
];

export async function GetDialogs(userID: string, callback: (dialogsData: DialogItem[]) => void) {
    // (new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(dialogsMock);
    //     }, 2000);
    // })).then((dialogsData) => {
    //     callback(dialogsData as DialogItem[]);
    // })

    const {status, data} = await axios.get(BACK_URL + CHAT_URL + `/channels?user_id=` + userID);

    console.log(status, data);

    if (status === 200) {
        callback(data?.channels as DialogItem[]);
    }
}