import { createSlice } from '@reduxjs/toolkit'
import { CertainMaterialResponse } from '../../shared/Consts/Interfaces';
import { MaterialItem } from '../../entity/Material/MaterialTypes';
import { GetMaterialByID } from '../../pages/CertainMaterial/api/CertainMaterial';

export interface CertainMaterialsState {
  isFetched: boolean,
  material: MaterialItem | undefined,
}

const initialState: CertainMaterialsState = {
    isFetched: false,
    material: undefined,
}

export const certainMaterialsSlice = createSlice({
  name: 'structurizedMessage',
  initialState,
  reducers: {
    clearCertainMaterial: (state: CertainMaterialsState) => {
        state.isFetched = false;
        state.material = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMaterialByID.fulfilled, (state: CertainMaterialsState, action) => {
        const response = action.payload as unknown as CertainMaterialResponse;

        state.isFetched = true;
        state.material = response.material;
    });
  }
})

export const { clearCertainMaterial } = certainMaterialsSlice.actions

export default certainMaterialsSlice.reducer