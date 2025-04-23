import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_URL, STUDY_MATERIALS_URL } from '../../../shared/Consts/URLS';
import { CODE_OK } from '../../../shared/Consts/Codes';

export const GetMaterialByID = createAsyncThunk(
    'materials/getByID',
    async (materialID: string) => {
        let status: number = CODE_OK;
        let data: unknown;

        await axios.get(BACK_URL + STUDY_MATERIALS_URL + '/' + materialID).then(
            (response) => {
                ({status, data} = response);
            }
        ).catch(({response}) => {
            data = undefined;
            status = response.status;
        });

        return {material: data, status};
    }
);