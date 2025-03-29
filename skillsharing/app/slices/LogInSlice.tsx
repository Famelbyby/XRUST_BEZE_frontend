import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {TextFieldState, PasswordFieldState} from '../../shared/Consts/Interfaces'

export interface LogInState {
    identifier: TextFieldState,
    password: PasswordFieldState,
}

const initialState: LogInState = {
    identifier: {
        value: '',
        error: undefined,
    },
    password: {
        value: '',
        error: undefined,
        isHidden: true,
    },
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    editedPasswordField: (state: LogInState, action: PayloadAction<string>) => {
        state.password.value = action.payload;
    },
    editedIdentifierField: (state: LogInState, action: PayloadAction<string>) => {
        state.identifier.value = action.payload;
    },
    toggleIsPasswordHidden: (state: LogInState) => {
        state.password.isHidden = !state.password.isHidden;
    },
  },
})

export const { editedIdentifierField, editedPasswordField, toggleIsPasswordHidden } = loginSlice.actions

export default loginSlice.reducer