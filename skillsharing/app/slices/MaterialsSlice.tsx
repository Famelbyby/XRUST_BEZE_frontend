import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterType, UserMaterialsResponse } from '../../shared/Consts/Interfaces';
import { MaterialItem } from '../../entity/Material/MaterialTypes';
import {GetMaterialsByName, GetMaterialsByTags} from '../../pages/Materials/api/Materials'

export interface MaterialsState {
  isFetched: boolean,
  materials: MaterialItem[],
  filterType: FilterType,
}

const defaultFilterType: FilterType = "name";

const initialState: MaterialsState = {
    isFetched: false,
    materials: [],
    filterType: defaultFilterType,
}

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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMaterialsByTags.fulfilled, (state: MaterialsState, action) => {
        const response = action.payload as unknown as UserMaterialsResponse;

        state.isFetched = true;
        state.materials = response.materials || [];
    }).addCase(GetMaterialsByName.fulfilled, (state: MaterialsState, action) => {
      const response = action.payload as unknown as UserMaterialsResponse;

      state.isFetched = true;
      state.materials = response.materials || [];
  });
  }
})

export const { changeFilterType, clearMaterials } = materialsSlice.actions

export default materialsSlice.reducer