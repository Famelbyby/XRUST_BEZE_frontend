import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    CategoryResponse,
    FilterType,
    UserMaterialsResponse,
} from '../../shared/Consts/Interfaces';
import { MaterialItem } from '../../entity/Material/MaterialTypes';
import { GetMaterialsByName, GetMaterialsByTags } from '../../pages/Materials/api/Materials';
import { GetCategories } from '../../pages/Auth/api/Auth';
import { CODE_OK } from '../../shared/Consts/Codes';

export interface MaterialsState {
    isFetched: boolean;
    materials: MaterialItem[];
    filterType: FilterType;
    globalSkills: string[];
}

const defaultFilterType: FilterType = 'name';

const initialState: MaterialsState = {
    isFetched: false,
    materials: [],
    filterType: defaultFilterType,
    globalSkills: [],
};

export const materialsSlice = createSlice({
    name: 'structurizedMessage',
    initialState,
    reducers: {
        changeFilterType: (state: MaterialsState, action: PayloadAction<string>) => {
            state.filterType = action.payload as FilterType;
        },
        clearMaterials: (state: MaterialsState) => {
            state.isFetched = false;
            state.materials = [];
            state.filterType = defaultFilterType;
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

                state.globalSkills = [];

                data.categories.forEach((category) => {
                    state.globalSkills = [...state.globalSkills, ...category.skills];
                });

                state.globalSkills = state.globalSkills
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
            });
    },
});

export const { changeFilterType, clearMaterials } = materialsSlice.actions;

export default materialsSlice.reducer;
