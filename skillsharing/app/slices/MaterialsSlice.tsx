import { createSlice } from '@reduxjs/toolkit';
import { CategoryResponse, UserMaterialsResponse } from '../../shared/Consts/Interfaces';
import { MaterialItem } from '../../entity/Material/MaterialTypes';
import { GetMaterialsByName, GetMaterialsByTags } from '../../pages/Materials/api/Materials';
import { GetCategories } from '../../pages/Auth/api/Auth';
import { CODE_OK } from '../../shared/Consts/Codes';

export interface MaterialsState {
    isFetched: boolean;
    materials: MaterialItem[];
    globalSkills: string[];
}

const initialState: MaterialsState = {
    isFetched: false,
    materials: [],
    globalSkills: [],
};

export const materialsSlice = createSlice({
    name: 'structurizedMessage',
    initialState,
    reducers: {
        clearMaterials: (state: MaterialsState) => {
            state.isFetched = false;
            state.materials = [];
            state.globalSkills = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetMaterialsByTags.fulfilled, (state: MaterialsState, action) => {
                const response = action.payload as unknown as UserMaterialsResponse;

                state.isFetched = true;
                state.materials = response.materials || [];
            })
            .addCase(GetMaterialsByName.fulfilled, (state: MaterialsState, action) => {
                const response = action.payload as unknown as UserMaterialsResponse;

                state.isFetched = true;
                state.materials = response.materials || [];
            })
            .addCase(GetCategories.fulfilled, (state: MaterialsState, action) => {
                const data = action.payload as CategoryResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.globalSkills = data.categories;
            });
    },
});

export const { clearMaterials } = materialsSlice.actions;

export default materialsSlice.reducer;
