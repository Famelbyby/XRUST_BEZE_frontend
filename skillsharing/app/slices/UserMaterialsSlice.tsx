import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeleteMaterial, GetUserMaterials } from '../../pages/UserMaterials/api/UserMaterials';
import { DeleteMaterialResponse, UserMaterialsResponse } from '../../shared/Consts/Interfaces';
import { MaterialItem } from '../../entity/Material/MaterialTypes';
import { CODE_OK } from '../../shared/Consts/Codes';

export interface UserMaterialsState {
    isFetched: boolean;
    materials: MaterialItem[];
    isHiddenDeleteWindow: boolean;
    deletedMaterialId: string;
}

const initialState: UserMaterialsState = {
    isFetched: false,
    materials: [],
    isHiddenDeleteWindow: true,
    deletedMaterialId: '',
};

export const userMaterialsSlice = createSlice({
    name: 'structurizedMessage',
    initialState,
    reducers: {
        clearUserMaterials: (state: UserMaterialsState) => {
            state.isFetched = false;
            state.materials = [];
        },
        setIsHiddenDeleteMaterial: (
            state: UserMaterialsState,
            action: PayloadAction<{ id?: string; bool: boolean }>,
        ) => {
            state.isHiddenDeleteWindow = action.payload.bool;
            state.deletedMaterialId = action.payload.id || '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUserMaterials.fulfilled, (state: UserMaterialsState, action) => {
                const response = action.payload as unknown as UserMaterialsResponse;

                state.isFetched = true;
                state.materials = response.materials || [];
            })
            .addCase(DeleteMaterial.fulfilled, (state: UserMaterialsState, action) => {
                const response = action.payload as unknown as DeleteMaterialResponse;

                if (response.status !== CODE_OK) {
                    return;
                }

                const materialId: string = action.payload.materialId;

                state.materials = state.materials.filter((material) => material.id !== materialId);
            });
    },
});

export const { setIsHiddenDeleteMaterial, clearUserMaterials } = userMaterialsSlice.actions;

export default userMaterialsSlice.reducer;
