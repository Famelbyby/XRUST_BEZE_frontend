import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACK_URL, CHAT_URL } from "../../../shared/Consts/URLS";
import { MessageRequest } from "../../../shared/Consts/Interfaces";
import { CODE_OK } from "../../../shared/Consts/Codes";

export const GetMessageById = createAsyncThunk(
    'structurizedMessage/getMessageById',
    async ({messageId, userId}: MessageRequest) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        await axios.get(BACK_URL + CHAT_URL + `/messages/${messageId}`).then((response) => {
            status = response.status;
            data = {message: response.data.message, userId};
            error = undefined;
        }).catch(({response}) => {
            status = response.status;
            data = undefined;
            error = response.data;
        });

        return {status, messageData: data, error};
    }
);