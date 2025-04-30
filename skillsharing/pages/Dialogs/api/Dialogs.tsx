import axios from "axios";
import { BACK_URL, CHAT_URL } from "../../../shared/Consts/URLS";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CODE_OK } from "../../../shared/Consts/Codes";

export const GetDialogs = createAsyncThunk(
    'dialogs/getDialogs',
    async (userID: string) => {
        let data: unknown;
        let status: number = CODE_OK;
        
        await axios.get(BACK_URL + CHAT_URL + `/channels?user_id=` + userID).then(
            (response) => {
                status = response.status;
                data = response.data.channels;
            }
        ).catch(({response}) => {
            status = response.status;
            data = undefined;
        });
    
        return {dialogs: data, status};
    }
);

export const GetLastMessage = createAsyncThunk(
    'dialogs/getLastMessage',
    async (channelId: string) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        await axios.get(BACK_URL + CHAT_URL + `/${channelId}?limit=1`).then((response) => {
            status = response.status;
            data = response.data.messages;
            error = undefined;
        }).catch(({response}) => {
            status = response.status;
            data = undefined;
            error = response.data;
        });
    
        return {messages: data, channelId, status, error};
    }
);