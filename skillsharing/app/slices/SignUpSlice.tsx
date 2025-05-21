import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    TextFieldState,
    PasswordFieldState,
    AvatarFieldState,
    LoadAvatarResponse,
    UserResponse,
    CommunicationFormat,
    Skill,
    CategoryResponse,
    SkillLevel,
} from '../../shared/Consts/Interfaces';
import {
    MatchPasswords,
    ValidateAvatarExtension,
    ValidateAvatarSize,
    ValidateEmail,
    ValidatePassword,
    ValidateUsername,
} from '../../shared/Functions/Validators';
import { GetCategories, LoadAvatar, TryRegister } from '../../pages/Auth/api/Auth';
import { CODE_OK } from '../../shared/Consts/Codes';
import {
    AUTH_SIGNUP_MODERATION,
    AUTH_SIGNUP_EMAIL_EXIST,
    AUTH_SIGNUP_USERNAME_EXIST,
    AUTH_SIGNUP_VALIDATION,
} from '../../shared/Consts/Errors';
import {
    ATLEAST_ONE_SKILL,
    BAD_USERNAME,
    EMAIL_ALREADY_EXISTS,
    MAX_HREFS_COUNT,
    PASSWORD_MISMATCH,
    USERNAME_ALREADY_EXISTS,
    WRONG_EMAIL_FORMAT,
    WRONG_PASSWORD_FORMAT,
    WRONG_USERNAME_FORMAT,
} from '../../shared/Consts/ValidatorsConts';

type SignUpStep = 1 | 2 | 3;

export interface SignUpState {
    identifier: TextFieldState;
    password: PasswordFieldState;
    repeatPassword: PasswordFieldState;
    email: TextFieldState;
    avatar: AvatarFieldState;
    preferred_format: CommunicationFormat;
    bio: TextFieldState;
    isPending: boolean;
    globalSkills: string[];
    skills_to_learn: Skill[];
    skillsToLearnError: string | undefined;
    skills_to_share: Skill[];
    skillsToShareError: string | undefined;
    step: SignUpStep;
    hrefs: {
        value: string;
        error: undefined | string;
    }[];
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
    preferred_format: 'text',
    isPending: false,
    globalSkills: [],
    skills_to_learn: [],
    skills_to_share: [],
    step: 1,
    hrefs: [],
    skillsToLearnError: ATLEAST_ONE_SKILL,
    skillsToShareError: ATLEAST_ONE_SKILL,
};

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        editedPasswordField: (state: SignUpState, action: PayloadAction<string>) => {
            state.password.value = action.payload;

            let isValid: boolean = ValidatePassword(state.password.value);

            if (!isValid) {
                state.password.error = WRONG_PASSWORD_FORMAT;
            } else {
                state.password.error = undefined;
            }

            isValid = MatchPasswords(state.password.value, state.repeatPassword.value);

            if (!isValid) {
                state.repeatPassword.error = PASSWORD_MISMATCH;
            } else {
                state.repeatPassword.error = undefined;
            }
        },
        editedRepeatPasswordField: (state: SignUpState, action: PayloadAction<string>) => {
            state.repeatPassword.value = action.payload;

            let isValid: boolean = ValidatePassword(state.repeatPassword.value);

            if (!isValid) {
                state.repeatPassword.error = WRONG_PASSWORD_FORMAT;
                return;
            }

            isValid = MatchPasswords(state.password.value, state.repeatPassword.value);

            if (!isValid) {
                state.repeatPassword.error = PASSWORD_MISMATCH;
            } else {
                state.repeatPassword.error = undefined;
            }
        },
        editedIdentifierField: (state: SignUpState, action: PayloadAction<string>) => {
            state.identifier.value = action.payload;

            const isValid: boolean = ValidateUsername(state.identifier.value);

            if (!isValid) {
                state.identifier.error = WRONG_USERNAME_FORMAT;
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
                state.email.error = WRONG_EMAIL_FORMAT;
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
                state.avatar.error =
                    'Неправильный формат файла: доступны только jpg, jpeg, webp и png';
                state.avatar.file = undefined;
            } else {
                isValid = ValidateAvatarSize(avatarFile);

                if (!isValid) {
                    state.avatar.error = 'Максимальный размер - 5Мб';
                    state.avatar.file = undefined;
                } else {
                    state.avatar.error = undefined;
                    state.avatar.file = avatarFile;
                }
            }
        },
        setCommunicationFormat: (
            state: SignUpState,
            action: PayloadAction<CommunicationFormat>,
        ) => {
            state.preferred_format = action.payload;
        },
        addSkillToLearn: (state: SignUpState, action: PayloadAction<string | undefined>) => {
            const newSkill = action.payload;

            state.skills_to_learn.push({
                name: newSkill || state.globalSkills[0],
                level: 'beginner',
                description: '',
            });

            state.skillsToLearnError = undefined;
        },
        deleteSkillFromLearn: (state: SignUpState, action: PayloadAction<string>) => {
            const skillName: string = action.payload;

            const index: number = state.skills_to_learn.findIndex(
                (skill) => skill.name === skillName,
            );

            if (index === -1) {
                return;
            }

            state.skills_to_learn = [
                ...state.skills_to_learn.slice(0, index),
                ...state.skills_to_learn.slice(index + 1),
            ];

            if (state.skills_to_learn.length === 0) {
                state.skillsToLearnError = ATLEAST_ONE_SKILL;
            }
        },
        editedSkillToLearn: (state: SignUpState, action: PayloadAction<[number, string]>) => {
            const [index, skillName] = action.payload;

            state.skills_to_learn[index].name = skillName;
        },
        editedSkillToLearnLevel: (state: SignUpState, action: PayloadAction<[number, string]>) => {
            const [index, skillLevel] = action.payload;

            state.skills_to_learn[index].level = skillLevel as SkillLevel;
        },
        addSkillToShare: (state: SignUpState, action: PayloadAction<string | undefined>) => {
            const newSkill = action.payload;

            state.skills_to_share.push({
                name: newSkill || state.globalSkills[0],
                level: 'beginner',
                description: '',
            });

            state.skillsToShareError = undefined;
        },
        deleteSkillFromShare: (state: SignUpState, action: PayloadAction<string>) => {
            const skillName: string = action.payload;

            const index: number = state.skills_to_share.findIndex(
                (skill) => skill.name === skillName,
            );

            if (index === -1) {
                return;
            }

            state.skills_to_share = [
                ...state.skills_to_share.slice(0, index),
                ...state.skills_to_share.slice(index + 1),
            ];

            state.skillsToShareError = ATLEAST_ONE_SKILL;
        },
        editedSkillToShare: (state: SignUpState, action: PayloadAction<[number, string]>) => {
            const [index, skillName] = action.payload;

            state.skills_to_share[index].name = skillName;
        },
        editedSkillToShareLevel: (state: SignUpState, action: PayloadAction<[number, string]>) => {
            const [index, skillLevel] = action.payload;

            state.skills_to_share[index].level = skillLevel as SkillLevel;
        },
        addHref: (state: SignUpState) => {
            if (state.hrefs.length === MAX_HREFS_COUNT) {
                return;
            }

            state.hrefs.push({
                value: '',
                error: undefined,
            });
        },
        deleteHref: (state: SignUpState, action: PayloadAction<number>) => {
            const index = action.payload;

            if (index < 0 || index >= state.hrefs.length) {
                return;
            }

            state.hrefs = [...state.hrefs.slice(0, index), ...state.hrefs.slice(index + 1)];
        },
        changeHref: (
            state: SignUpState,
            action: PayloadAction<{ index: number; nextValue: string }>,
        ) => {
            const { index, nextValue } = action.payload;

            if (index < 0 || index >= state.hrefs.length) {
                return;
            }

            state.hrefs[index].value = nextValue;
        },
        increaseStep: (state: SignUpState) => {
            state.step += 1;
        },
        decreaseStep: (state: SignUpState) => {
            state.step -= 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoadAvatar.pending, (state: SignUpState) => {
                state.isPending = true;
            })
            .addCase(LoadAvatar.fulfilled, (state: SignUpState, action) => {
                const data = action.payload as LoadAvatarResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.avatar.URL = data.avatarURL;
            })
            .addCase(TryRegister.fulfilled, (state: SignUpState, action) => {
                state.isPending = false;

                const data = action.payload as UserResponse;

                if (data.status === CODE_OK) {
                    state.identifier = initialState.identifier;
                    state.password = initialState.password;
                    state.avatar = initialState.avatar;
                    state.bio = initialState.bio;
                    state.email = initialState.email;
                    state.hrefs = initialState.hrefs;
                    state.isPending = initialState.isPending;
                    state.preferred_format = initialState.preferred_format;
                    state.repeatPassword = initialState.repeatPassword;
                    state.skills_to_learn = initialState.skills_to_learn;
                    state.skills_to_share = initialState.skills_to_share;
                    state.step = initialState.step;
                    return;
                }

                switch (data.error?.error) {
                    case AUTH_SIGNUP_EMAIL_EXIST:
                        state.email.error = EMAIL_ALREADY_EXISTS;
                        state.step = 1;
                        break;
                    case AUTH_SIGNUP_USERNAME_EXIST:
                        state.identifier.error = USERNAME_ALREADY_EXISTS;
                        state.step = 1;
                        break;
                    case AUTH_SIGNUP_MODERATION:
                        state.identifier.error = BAD_USERNAME;
                        state.step = 1;
                        break;
                    case AUTH_SIGNUP_VALIDATION:
                        if (data.error.validation_error_fields?.includes('Email')) {
                            state.email.error = WRONG_EMAIL_FORMAT;
                            state.step = 1;
                        }

                        break;
                }
            })
            .addCase(GetCategories.fulfilled, (state: SignUpState, action) => {
                const data = action.payload as CategoryResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.globalSkills = data.categories;
                state.avatar.URL = undefined;
                state.avatar.error = undefined;
                state.avatar.file = undefined;
            });
    },
});

export const {
    addHref,
    deleteHref,
    changeHref,
    increaseStep,
    decreaseStep,
    addSkillToShare,
    deleteSkillFromShare,
    editedSkillToShare,
    editedSkillToShareLevel,
    editedSkillToLearnLevel,
    editedSkillToLearn,
    deleteSkillFromLearn,
    setCommunicationFormat,
    editedBioField,
    editedPasswordField,
    editedRepeatPasswordField,
    editedIdentifierField,
    editedEmailField,
    editedAvatarField,
    toggleIsPasswordHidden,
    toggleIsRepeatPasswordHidden,
    addSkillToLearn,
} = signupSlice.actions;

export default signupSlice.reducer;
