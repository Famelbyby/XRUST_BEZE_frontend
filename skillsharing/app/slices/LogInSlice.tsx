import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {TextFieldState, PasswordFieldState, UserResponse} from '../../shared/Consts/Interfaces'
import {ValidateEmail, ValidatePassword, ValidateUsername} from '../../shared/Functions/Validators'
import { TryAuth } from '../../pages/Auth/api/Auth'
import { CODE_OK } from '../../shared/Consts/Codes'
import {AUTH_LOGIN_NOT_EXIST, AUTH_LOGIN_WRONG_PASSWORD} from '../../shared/Consts/Errors';

export interface LogInState {
    identifier: TextFieldState,
    password: PasswordFieldState,
    isPending: boolean,
    isEmailValid: boolean,
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
    isEmailValid: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    editedPasswordField: (state: LogInState, action: PayloadAction<string>) => {
        state.password.value = action.payload;

        const isValid: boolean = ValidatePassword(state.password.value);

        if (!isValid) {
            state.password.error = 'Длина пароля - от 8 до 64 символов. Должны быть хотя бы одна заглавная буква, одна строчная, одна цифра и один спецсимвол';
        } else {
            state.password.error = undefined;
        }
    },
    editedIdentifierField: (state: LogInState, action: PayloadAction<string>) => {
        state.identifier.value = action.payload;

        const isValidEmail: boolean = ValidateEmail(state.identifier.value);
        const isValidUsername: boolean = ValidateUsername(state.identifier.value);

        if (!isValidEmail && !isValidUsername) {
            state.isEmailValid = false;
            state.identifier.error = 'Неправильный формат имени/почты';
        } else {
            state.identifier.error = undefined;
        }

        if (!isValidEmail) {
            state.isEmailValid = false;
        } else {
            state.isEmailValid = true;
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

        if (data.status === CODE_OK) {
            return;
        }

        console.log(data.error);

        switch (data.error) {
            case AUTH_LOGIN_WRONG_PASSWORD:
                state.password.error = "Неправильный пароль";
                break;
            case AUTH_LOGIN_NOT_EXIST:
                state.identifier.error = "Не существует такого пользователя";
                break;
        }
      });
  },
})

export const { editedIdentifierField, editedPasswordField, toggleIsPasswordHidden } = loginSlice.actions

export default loginSlice.reducer