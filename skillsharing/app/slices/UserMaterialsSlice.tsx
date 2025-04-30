import { createSlice } from '@reduxjs/toolkit';
import { GetUserMaterials } from '../../pages/UserMaterials/api/UserMaterials';
import { UserMaterialsResponse } from '../../shared/Consts/Interfaces';
import { MaterialItem } from '../../entity/Material/MaterialTypes';

export interface UserMaterialsState {
    isFetched: boolean;
    materials: MaterialItem[];
}

const initialState: UserMaterialsState = {
    isFetched: false,
    materials: [],
};

export const userMaterialsSlice = createSlice({
    name: 'structurizedMessage',
    initialState,
    reducers: {
        clearUserMaterials: (state: UserMaterialsState) => {
            state.isFetched = false;
            state.materials = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GetUserMaterials.fulfilled, (state: UserMaterialsState, action) => {
            const response = action.payload as unknown as UserMaterialsResponse;

            state.isFetched = true;
            state.materials = response.materials || [];
        });
    },
});

export const { clearUserMaterials } = userMaterialsSlice.actions;

export default userMaterialsSlice.reducer;
