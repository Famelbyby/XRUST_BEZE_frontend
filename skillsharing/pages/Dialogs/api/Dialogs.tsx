import axios from "axios";
import { DialogItem } from "../../../entity/Dialog/ui/DialogTypes";
import { BACK_URL, CHAT_URL } from "../../../shared/Consts/URLS";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CODE_OK } from "../../../shared/Consts/Codes";

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
                "skills_to_share": [
                    {
                        "name": "sosal",
                        "level": "advanced",
                        "description": ""
                    },
                ],
                "bio": "",
                "avatar": "",
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
                "skills_to_share": [
                    {
                        "name": "sosal",
                        "level": "advanced",
                        "description": ""
                    },
                ],
                "bio": "",
                "avatar": "",
                "created_at": "2025-03-26T07:57:58.253Z",
                "updated_at": "2025-03-26T07:57:58.253Z",
                "last_active_at": "2025-03-26T07:57:58.253Z",
                "preferred_format": "text"
            }
        ],
        "last_message": {
            channel_id: "67e3b3b42214705bdbedb876",
            message_id: "32",
            user_id: "67e3b36b9a36154096b4bbea",
            payload: "ARIVIDERCHI",
            peer_id: "67e3b3869a36154096b4bbeb",
            created_at: 213232,
            updated_at: 3232322,
        },
        "created": 1742975924,
        "updated": 1742975924
    }
];

export const GetDialogs = createAsyncThunk(
    'dialogs/getDialogs',
    async (userID: string) => {
        // const response = await (new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(dialogsMock);
        //     }, 2000);
        // }));

        // return {dialogs: response, status: CODE_OK};

        try {
            const {status, data} = await axios.get(BACK_URL + CHAT_URL + `/channels?user_id=` + userID);
    
            return {dialogs: data.channels, status: status};
        } catch (event) {
            console.log(event);
        }
    }
);

export const GetLastMessage = createAsyncThunk(
    'dialogs/getLastMessage',
    async (channelId: string) => {
        try {
            const {status, data} = await axios.get(BACK_URL + CHAT_URL + `/${channelId}?limit=1`);
    
            return {messages: data.messages, channelId, status};
        } catch (event) {
            console.log(event);
        }
    }
);