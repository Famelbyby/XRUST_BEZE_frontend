import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {TextFieldState, PasswordFieldState} from '../../shared/Consts/Interfaces'
import {ValidateEmail, ValidatePassword} from '../../shared/Functions/Validators'
import { TryAuth } from '../../pages/Auth/api/Auth'
import { UserResponse } from '../../entity/User/api/User'
import { CODE_BAD, CODE_INTERNAL_SERVER, CODE_NOT_FOUND } from '../../shared/Consts/Codes'

export interface LogInState {
    identifier: TextFieldState,
    password: PasswordFieldState,
    isPending: boolean,
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
    isPending: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    editedPasswordField: (state: LogInState, action: PayloadAction<string>) => {
        state.password.value = action.payload;

        const isValid: boolean = ValidatePassword(state.password.value);

        if (!isValid) {
            state.password.error = 'Длина пароля - от 6 до 12 символов';
        } else {
            state.password.error = undefined;
        }
    },
    editedIdentifierField: (state: LogInState, action: PayloadAction<string>) => {
        state.identifier.value = action.payload;

        const isValid: boolean = ValidateEmail(state.identifier.value);

        if (!isValid) {
            state.identifier.error = 'Неправильный формат почты';
        } else {
            state.identifier.error = undefined;
        }
    },
    toggleIsPasswordHidden: (state: LogInState) => {
        state.password.isHidden = !state.password.isHidden;
    },
  },
  extraReducers: (builder) => {
      builder.addCase(TryAuth.pending, (state: LogInState) => {
        state.isPending = true;
      }).addCase(TryAuth.fulfilled, (state: LogInState, action) => {
        state.isPending = false;
        const data = action.payload as UserResponse;

        switch (data.status) {
            case CODE_BAD:
                state.password.error = "Пользователь с такими именем/паролем уже существует";
                break;
            case CODE_NOT_FOUND:
                state.identifier.error = "Такого пользователя не существует";
                break;
            case CODE_INTERNAL_SERVER:
                state.identifier.error = "Неожиданная ошибка";
                break;
        }
      });
  },
})

export const { editedIdentifierField, editedPasswordField, toggleIsPasswordHidden } = loginSlice.actions

export default loginSlice.reducer