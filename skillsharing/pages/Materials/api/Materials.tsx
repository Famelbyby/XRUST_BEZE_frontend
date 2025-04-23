import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACK_URL, STUDY_MATERIALS_URL } from "../../../shared/Consts/URLS";
import { CODE_OK } from "../../../shared/Consts/Codes";

export const GetMaterialsByTags = createAsyncThunk(
    'materials/getByTags',
    async (tags: string[]) => {
        let status: number = CODE_OK;
        let data: unknown;

        const queryTags = tags.map((tag) => `tag=${tag.toLowerCase()}`).join('&');

        await axios.get(BACK_URL + STUDY_MATERIALS_URL + `/by-tags?${queryTags}`).then(
            (response) => {
                status = response.status;
                data = response.data.study_materials;
            }
        ).catch(({response}) => {
            data = undefined;
            status = response.status;
        });

        return {materials: data, status};
    }
);

export const GetMaterialsByName = createAsyncThunk(
    'materials/getByName',
    async (name: string) => {
        let status: number = CODE_OK;
        let data: unknown;

        await axios.get(BACK_URL + STUDY_MATERIALS_URL + `?name=${name}`).then(
            (response) => {
                status = response.status;
                data = response.data.study_materials;
            }
        ).catch(({response}) => {
            data = undefined;
            status = response.status;
        });

        return {materials: data, status};
    }
);