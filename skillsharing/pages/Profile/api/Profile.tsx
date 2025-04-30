import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, USERS_URL } from "../../../shared/Consts/URLS";
import { CODE_OK } from "../../../shared/Consts/Codes";

export const GetProfile = createAsyncThunk(
    'profile/getProfileByID',
    async (userId: string) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        await axios.get(BACK_URL + USERS_URL + `/${userId}`).then((response) => {
            status = response.status;
            data = response.data;
            error = undefined;
        }).catch(({response}) => {
            status = response.status;
            data = undefined;
            error = response.data;
        });
    
        return {user: data, status: status, error};
    }
);