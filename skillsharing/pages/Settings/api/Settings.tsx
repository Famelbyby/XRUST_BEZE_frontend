import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, USERS_URL } from "../../../shared/Consts/URLS";
import { UpdateProfileRequest } from "../../../shared/Consts/Interfaces";

export const UpdateProfile = createAsyncThunk(
    'settings/updateProfile',
    async ({user, avatar, hrefs}: UpdateProfileRequest) => {
        // const response = await (new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(userMock);
        //     }, 2000)
        // }));
        
        // callback(response as ProfileType | undefined);

        // return {user: response, status: CODE_OK};
        try {
            const newAvatar: string = (avatar || user.avatar); 

            const {status, data} = await axios.put(BACK_URL + USERS_URL + `/${user.id}`, JSON.stringify({...user, avatar: newAvatar, hrefs}));

            return {user: data, status: status};
        }
        catch (event) {
            console.log(event);
            return {user: undefined, status};
        }
    }
);