import { createAsyncThunk } from '@reduxjs/toolkit';
import { CODE_OK } from '../../../shared/Consts/Codes';
import axios from 'axios';
import { BACK_URL, STUDY_MATERIALS_URL } from '../../../shared/Consts/URLS';

// const materialsMockUndefined = {
//     study_materials: undefined,
// }

// const materialsMock = [
//     {
//         "id": "6807ffaf212f5117f282d050",
//         "name": "Math Practice Problems",
//         "filename": "physics_problems.pdf",
//         "tags": [
//             "math"
//         ],
//         "author_id": "67ffd6b2267a8c246fabbcda",
//         "author": {
//             "username": "test4",
//             "avatar": "test_avatar.jpg"
//         },
//         "created": 1713792000,
//         "updated": 1713792000
//     }
// ];

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
