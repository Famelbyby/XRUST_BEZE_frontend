import { createAsyncThunk } from '@reduxjs/toolkit';
import { CODE_OK } from '../../../shared/Consts/Codes';
import axios from 'axios';
import { BACK_URL, STUDY_MATERIALS_URL } from '../../../shared/Consts/URLS';

export const GetUserMaterials = createAsyncThunk('user/getMaterials', async (userId: string) => {
    let status: number = CODE_OK;
    let data: unknown;

    await axios
        .get(BACK_URL + STUDY_MATERIALS_URL + `/by-author-id/${userId}`)
        .then((response) => {
            status = response.status;
            data = response.data.study_materials;
        })
        .catch(({ response }) => {
            status = response.status;
            data = undefined;
        });

    return { materials: data, status };
});

export const DeleteMaterial = createAsyncThunk(
    'user/deleteMaterial',
    async (materialId: string) => {
        let status: number = CODE_OK;

        await axios
            .delete(BACK_URL + STUDY_MATERIALS_URL + `/${materialId}`)
            .then((response) => {
                status = response.status;
            })
            .catch(({ response }) => {
                status = response.status;
            });

        return { status, materialId };
    },
);
