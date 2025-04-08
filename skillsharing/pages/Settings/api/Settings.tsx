import axios from "axios";
import { CODE_OK } from "../../../shared/Consts/Codes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, USERS_URL } from "../../../shared/Consts/URLS";
import { ProfileType } from "../../Profile/ui/ProfileTypes";
import { UpdateProfileRequest } from "../../../shared/Consts/Interfaces";

export const UpdateProfile = createAsyncThunk(
    'settings/updateProfile',
    async ({user, avatar}: UpdateProfileRequest) => {
        // const response = await (new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(userMock);
        //     }, 2000)
        // }));
        
        // callback(response as ProfileType | undefined);

        // return {user: response, status: CODE_OK};
        try {
            const newAvatar: string = (avatar || user.avatar); 

            const {status, data} = await axios.put(BACK_URL + USERS_URL + `/${user.id}`, JSON.stringify({...user, avatar: newAvatar}));

            return {user: data, status: status};
        }
        catch (event) {
            console.log(event);
            return {user: undefined, status};
        }
    }
);