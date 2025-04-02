import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {TextFieldState, PasswordFieldState, AvatarFieldState, LoadAvatarResponse, UserResponse, CommunicationFormat} from '../../shared/Consts/Interfaces'
import {MatchPasswords, ValidateAvatar, ValidateEmail, ValidatePassword, ValidateUsername} from '../../shared/Functions/Validators'
import { LoadAvatar, TryRegister } from '../../pages/Auth/api/Auth'
import { CODE_BAD, CODE_INTERNAL_SERVER, CODE_NOT_FOUND, CODE_OK } from '../../shared/Consts/Codes'

export interface SignUpState {
    identifier: TextFieldState,
    password: PasswordFieldState,
    repeatPassword: PasswordFieldState,
    email: TextFieldState,
    avatar: AvatarFieldState,
    preferred_format: CommunicationFormat,
    isPending: boolean,
}

const initialState: SignUpState = {
    identifier: {
        value: '',
        error: undefined,
    },
    password: {
        value: '',
        error: undefined,
        isHidden: true,
    },
    repeatPassword: {
        value: '',
        error: undefined,
        isHidden: true,
    },
    email: {
        value: '',
        error: undefined,
    },
    avatar: {
        file: undefined,
        URL: undefined,
        error: undefined,
    },
    preferred_format: "text",
    isPending: false,
}

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    editedPasswordField: (state: SignUpState, action: PayloadAction<string>) => {
        state.password.value = action.payload;

        let isValid: boolean = ValidatePassword(state.password.value);

        if (!isValid) {
            state.password.error = 'Длина пароля - от 6 до 12 символов';
        } else {
            state.password.error = undefined;
        }

        isValid = MatchPasswords(state.password.value, state.repeatPassword.value);

        if (!isValid) {
            state.repeatPassword.error = 'Пароли не совпадают';
        } else {
            state.repeatPassword.error = undefined;
        }
    },
    editedRepeatPasswordField: (state: SignUpState, action: PayloadAction<string>) => {
        state.repeatPassword.value = action.payload;

        let isValid: boolean = ValidatePassword(state.repeatPassword.value);

        if (!isValid) {
            state.repeatPassword.error = 'Длина пароля - от 6 до 12 символов';
            return;
        }

        isValid = MatchPasswords(state.password.value, state.repeatPassword.value);

        if (!isValid) {
            state.repeatPassword.error = 'Пароли не совпадают';
        } else {
            state.repeatPassword.error = undefined;
        }
    },
    editedIdentifierField: (state: SignUpState, action: PayloadAction<string>) => {
        state.identifier.value = action.payload;

        const isValid: boolean = ValidateUsername(state.identifier.value);

        if (!isValid) {
            state.identifier.error = 'Длина имени - от 3 до 25 символов. Содержит только кириллицу и символы латинского алфавита';
        } else {
            state.identifier.error = undefined;
        }
    },
    editedEmailField: (state: SignUpState, action: PayloadAction<string>) => {
        state.email.value = action.payload;

        const isValid: boolean = ValidateEmail(state.email.value);

        if (!isValid) {
            state.email.error = 'Неправильный формат почты';
        } else {
            state.email.error = undefined;
        }
    },
    toggleIsPasswordHidden: (state: SignUpState) => {
        state.password.isHidden = !state.password.isHidden;
    },
    toggleIsRepeatPasswordHidden: (state: SignUpState) => {
        state.repeatPassword.isHidden = !state.repeatPassword.isHidden;
    },
    editedAvatarField: (state: SignUpState, action: PayloadAction<File>) => {
        const avatarFile = action.payload;
        const isValid = ValidateAvatar(avatarFile);

        state.avatar.URL = undefined;

        if (!isValid) {
            state.avatar.error = 'Неправильный формат файла: доступны только jpg, jpeg, webp и png';
            state.avatar.file = undefined;
        } else {
            state.avatar.error = undefined;
            state.avatar.file = avatarFile;
        }
    },
    setCommunicationFormat: (state: SignUpState, action: PayloadAction<CommunicationFormat>) => {
        state.preferred_format = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoadAvatar.pending, (state: SignUpState) => {
        state.isPending = true;
    }).addCase(LoadAvatar.fulfilled, (state: SignUpState, action) => {
        const data = action.payload as LoadAvatarResponse;

        if (data.status !== CODE_OK) {
            return;
        }

        state.avatar.URL = data.avatarURL;
        console.log(state.avatar.URL);
    }).addCase(TryRegister.fulfilled, (state: SignUpState, action) => {
        state.isPending = false;
        
        const data = action.payload as UserResponse;

        switch (data.status) {
            case CODE_BAD:
                state.identifier.error = "Пользователь с такими именем/паролем уже существует";
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

export const { setCommunicationFormat, editedPasswordField, editedRepeatPasswordField, editedIdentifierField, editedEmailField, editedAvatarField, toggleIsPasswordHidden, toggleIsRepeatPasswordHidden } = signupSlice.actions

export default signupSlice.reducer