import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes'
import { CODE_CREATED, CODE_OK } from '../../shared/Consts/Codes';
import { TryAuth, TryRegister } from '../../pages/Auth/api/Auth';
import { CommunicationFormat, UserResponse } from '../../shared/Consts/Interfaces';
import { GetUserByCookie } from '../../entity/User/api/User';
import { ValidateUsername } from '../../shared/Functions/Validators';

export interface SettingsState {
    user: ProfileType | undefined,
    usernameError: string | undefined,
}

const initialState: SettingsState = {
    user: undefined,
    usernameError: undefined,
}

export const settingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferredFormat: (state: SettingsState, action: PayloadAction<CommunicationFormat>) => {
        if (state.user === undefined) {
            return;
        }

        state.user.preferred_format = action.payload;
    },
    setUsername: (state: SettingsState, action: PayloadAction<string>) => {
        if (state.user === undefined) {
            return;
        }

        state.user.username = action.payload;

        const isValid: boolean = ValidateUsername(action.payload);

        if (!isValid) {
            state.usernameError = 'Длина имени - от 3 до 25 символов. Содержит только кириллицу и символы латинского алфавита'
        }
    },
    setBio: (state: SettingsState, action: PayloadAction<string>) => {
        if (state.user === undefined) {
            return;
        }

        state.user.bio = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUserByCookie.fulfilled, (state: SettingsState, action) => {
        const data = action.payload as UserResponse;

        if (data.status !== CODE_OK) {
            return;
        }

        state.user = data.user;
    }).addCase(TryAuth.fulfilled, (state: SettingsState, action) => {
        const data = action.payload as UserResponse;
        
        if (data.status === CODE_OK) {
            state.user = data.user;
        }
    }).addCase(TryRegister.fulfilled, (state: SettingsState, action) => {
        const data = action.payload as UserResponse;

        if (data.status === CODE_CREATED) {
            state.user = data.user;
        }
    });
  },
})

export const { setBio, setUsername, setPreferredFormat } = settingsSlice.actions

export default settingsSlice.reducer