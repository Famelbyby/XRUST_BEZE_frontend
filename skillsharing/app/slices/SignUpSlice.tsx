import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {TextFieldState, PasswordFieldState, AvatarFieldState, LoadAvatarResponse, UserResponse, CommunicationFormat, Skill, CategoryResponse, SkillLevel} from '../../shared/Consts/Interfaces'
import {MatchPasswords, ValidateAvatarExtension, ValidateAvatarSize, ValidateEmail, ValidatePassword, ValidateUsername} from '../../shared/Functions/Validators'
import { GetCategories, LoadAvatar, TryRegister } from '../../pages/Auth/api/Auth'
import { CODE_BAD, CODE_INTERNAL_SERVER, CODE_NOT_FOUND, CODE_OK } from '../../shared/Consts/Codes'

type SignUpStep = 1 | 2 | 3;

export interface SignUpState {
    identifier: TextFieldState,
    password: PasswordFieldState,
    repeatPassword: PasswordFieldState,
    email: TextFieldState,
    avatar: AvatarFieldState,
    preferred_format: CommunicationFormat,
    bio: TextFieldState,
    isPending: boolean,
    globalSkills: string[],
    skills_to_learn: Skill[],
    skills_to_share: Skill[],
    step: SignUpStep,
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
    bio: {
        value: '',
        error: undefined,
    },
    preferred_format: "text",
    isPending: false,
    globalSkills: [],
    skills_to_learn: [],
    skills_to_share: [],
    step: 1,
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
    editedBioField: (state: SignUpState, action: PayloadAction<string>) => {
        state.bio.value = action.payload;
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
        let isValid = ValidateAvatarExtension(avatarFile);

        state.avatar.URL = undefined;

        if (!isValid) {
            state.avatar.error = 'Неправильный формат файла: доступны только jpg, jpeg, webp и png';
            state.avatar.file = undefined;
        } else {
            isValid = ValidateAvatarSize(avatarFile);

            if (!isValid) {
                state.avatar.error = "Максимальный размер - 5Мб";
                state.avatar.file = undefined;
            } else {
                state.avatar.error = undefined;
                state.avatar.file = avatarFile;
            }
        }
    },
    setCommunicationFormat: (state: SignUpState, action: PayloadAction<CommunicationFormat>) => {
        state.preferred_format = action.payload;
    },
    addSkillToLearn: (state: SignUpState) => {
        state.skills_to_learn.push({name: state.globalSkills[0], level: "beginner", description: ''});
    },
    deleteSkillFromLearn: (state: SignUpState, action: PayloadAction<string>) => {
        const skillName: string = action.payload;

        const index: number = state.skills_to_learn.findIndex((skill) => skill.name === skillName);

        if (index === -1) {
            return;
        }

        state.skills_to_learn = [...state.skills_to_learn.slice(0, index), ...state.skills_to_learn.slice(index + 1)];
    },
    editedSkillToLearn: (state: SignUpState, action: PayloadAction<[number, string]>) => {
        const [index, skillName] = action.payload;

        state.skills_to_learn[index].name = skillName;
    },
    editedSkillToLearnLevel: (state: SignUpState, action: PayloadAction<[number, string]>) => {
        const [index, skillLevel] = action.payload;

        state.skills_to_learn[index].level = skillLevel as SkillLevel;
    },
    addSkillToShare: (state: SignUpState) => {
        state.skills_to_share.push({name: state.globalSkills[0], level: "beginner", description: ''});
    },
    deleteSkillFromShare: (state: SignUpState, action: PayloadAction<string>) => {
        const skillName: string = action.payload;

        const index: number = state.skills_to_share.findIndex((skill) => skill.name === skillName);

        if (index === -1) {
            return;
        }

        state.skills_to_share = [...state.skills_to_share.slice(0, index), ...state.skills_to_share.slice(index + 1)];
    },
    editedSkillToShare: (state: SignUpState, action: PayloadAction<[number, string]>) => {
        const [index, skillName] = action.payload;

        state.skills_to_share[index].name = skillName;
    },
    editedSkillToShareLevel: (state: SignUpState, action: PayloadAction<[number, string]>) => {
        const [index, skillLevel] = action.payload;

        state.skills_to_share[index].level = skillLevel as SkillLevel;
    },
    increaseStep: (state: SignUpState) => {
        state.step += 1;
    },
    decreaseStep: (state: SignUpState) => {
        state.step -= 1;
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
    }).addCase(GetCategories.fulfilled, (state: SignUpState, action) => {
        const data = action.payload as CategoryResponse;

        if (data.status !== CODE_OK) {
            return;
        }

        data.categories.forEach((category) => {
            state.globalSkills = [...state.globalSkills, ...category.skills]
        });

        state.globalSkills = state.globalSkills.filter((value, index, array) => array.indexOf(value) === index).sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
        state.skills_to_learn = [{name: state.globalSkills[0], level: "beginner", description: ''}];
        state.skills_to_share = [{name: state.globalSkills[0], level: "beginner", description: ''}];
        state.avatar.URL = undefined;
        state.avatar.error = undefined;
        state.avatar.file = undefined;
    });
  },
})

export const { increaseStep, decreaseStep, addSkillToShare, deleteSkillFromShare, editedSkillToShare, editedSkillToShareLevel, editedSkillToLearnLevel, editedSkillToLearn, deleteSkillFromLearn, setCommunicationFormat, editedBioField, editedPasswordField, editedRepeatPasswordField, editedIdentifierField, editedEmailField, editedAvatarField, toggleIsPasswordHidden, toggleIsRepeatPasswordHidden, addSkillToLearn } = signupSlice.actions

export default signupSlice.reducer