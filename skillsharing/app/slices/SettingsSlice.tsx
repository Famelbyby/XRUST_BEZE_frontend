import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import { CODE_OK } from '../../shared/Consts/Codes';
import { GetCategories, LoadAvatar, TryAuth, TryRegister } from '../../pages/Auth/api/Auth';
import {
    AvatarFieldState,
    CategoryResponse,
    CommunicationFormat,
    LoadAvatarResponse,
    SkillLevel,
    UserResponse,
} from '../../shared/Consts/Interfaces';
import { GetUserByCookie } from '../../entity/User/api/User';
import {
    ValidateAvatarExtension,
    ValidateAvatarSize,
    ValidateUsername,
} from '../../shared/Functions/Validators';
import { GetProfile } from '../../pages/Profile/api/Profile';
import { UpdateProfile } from '../../pages/Settings/api/Settings';
import {
    ATLEAST_ONE_SKILL,
    BAD_BIO,
    BAD_USERNAME,
    MAX_HREFS_COUNT,
    USERNAME_ALREADY_EXISTS,
    WRONG_USERNAME_FORMAT,
} from '../../shared/Consts/ValidatorsConts';
import { SETTINGS_PROFANITY_DETECTED, SETTINGS_USERNAME_EXIST } from '../../shared/Consts/Errors';

export interface SettingsState {
    user: ProfileType | undefined;
    usernameError: string | undefined;
    bioError: string | undefined;
    isUpdated: boolean;
    globalSkills: string[];
    avatar: AvatarFieldState;
    isPending: boolean;
    hrefs: {
        value: string;
        error: string | undefined;
    }[];
    skillsToLearnError: string | undefined;
    skillsToShareError: string | undefined;
}

const initialState: SettingsState = {
    user: undefined,
    usernameError: undefined,
    bioError: undefined,
    isUpdated: false,
    globalSkills: [],
    avatar: {
        URL: undefined,
        error: undefined,
        file: undefined,
    },
    isPending: false,
    hrefs: [],
    skillsToLearnError: undefined,
    skillsToShareError: undefined,
};

export const settingsSlice = createSlice({
    name: 'settings',
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
                state.usernameError = WRONG_USERNAME_FORMAT;
            } else {
                state.usernameError = undefined;
            }
        },
        setBio: (state: SettingsState, action: PayloadAction<string>) => {
            if (state.user === undefined) {
                return;
            }

            state.user.bio = action.payload;
        },
        clearUpdated: (state: SettingsState) => {
            state.isUpdated = false;
        },
        addSkillToLearn: (state: SettingsState, action: PayloadAction<string | undefined>) => {
            if (state.user === undefined) {
                return;
            }

            const newSkill = action.payload;

            state.user.skills_to_learn.push({
                name: newSkill || state.globalSkills[0],
                level: 'beginner',
                description: '',
            });

            state.skillsToLearnError = undefined;
        },
        deleteSkillFromLearn: (state: SettingsState, action: PayloadAction<string>) => {
            const skillName: string = action.payload;

            if (state.user === undefined) {
                return;
            }

            const index: number = state.user.skills_to_learn.findIndex(
                (skill) => skill.name === skillName,
            );

            if (index === -1) {
                return;
            }

            state.user.skills_to_learn = [
                ...state.user.skills_to_learn.slice(0, index),
                ...state.user.skills_to_learn.slice(index + 1),
            ];

            if (state.user.skills_to_learn.length === 0) {
                state.skillsToLearnError = ATLEAST_ONE_SKILL;
            }
        },
        editedSkillToLearn: (state: SettingsState, action: PayloadAction<[number, string]>) => {
            const [index, skillName] = action.payload;

            if (state.user === undefined) {
                return;
            }

            state.user.skills_to_learn[index].name = skillName;
        },
        editedSkillToLearnLevel: (
            state: SettingsState,
            action: PayloadAction<[number, string]>,
        ) => {
            const [index, skillLevel] = action.payload;

            if (state.user === undefined) {
                return;
            }

            state.user.skills_to_learn[index].level = skillLevel as SkillLevel;
        },
        addSkillToShare: (state: SettingsState, action: PayloadAction<string | undefined>) => {
            if (state.user === undefined) {
                return;
            }

            const newSkill = action.payload;

            state.user.skills_to_share.push({
                name: newSkill || state.globalSkills[0],
                level: 'beginner',
                description: '',
            });

            state.skillsToShareError = undefined;
        },
        deleteSkillFromShare: (state: SettingsState, action: PayloadAction<string>) => {
            const skillName: string = action.payload;

            if (state.user === undefined) {
                return;
            }

            const index: number = state.user.skills_to_share.findIndex(
                (skill) => skill.name === skillName,
            );

            if (index === -1) {
                return;
            }

            state.user.skills_to_share = [
                ...state.user.skills_to_share.slice(0, index),
                ...state.user.skills_to_share.slice(index + 1),
            ];

            if (state.user.skills_to_share.length === 0) {
                state.skillsToShareError = ATLEAST_ONE_SKILL;
            }
        },
        editedSkillToShare: (state: SettingsState, action: PayloadAction<[number, string]>) => {
            const [index, skillName] = action.payload;

            if (state.user === undefined) {
                return;
            }

            state.user.skills_to_share[index].name = skillName;
        },
        editedSkillToShareLevel: (
            state: SettingsState,
            action: PayloadAction<[number, string]>,
        ) => {
            const [index, skillLevel] = action.payload;

            if (state.user === undefined) {
                return;
            }

            state.user.skills_to_share[index].level = skillLevel as SkillLevel;
        },
        setAvatar: (state: SettingsState, action: PayloadAction<File>) => {
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
        clearSettings: (state: SettingsState) => {
            state.isUpdated = false;
            state.avatar.URL = undefined;
            state.avatar.file = undefined;
            state.avatar.error = undefined;
            state.usernameError = undefined;
            state.isPending = false;
            state.hrefs = [];
            state.bioError = undefined;
            state.skillsToLearnError = undefined;
            state.skillsToShareError = undefined;
        },
        addHrefSettings: (state: SettingsState) => {
            if (state.hrefs.length === MAX_HREFS_COUNT) {
                return;
            }

            state.hrefs.push({
                value: '',
                error: undefined,
            });
        },
        deleteHrefSettings: (state: SettingsState, action: PayloadAction<number>) => {
            const index = action.payload;

            if (index < 0 || index >= state.hrefs.length) {
                return;
            }

            state.hrefs = [...state.hrefs.slice(0, index), ...state.hrefs.slice(index + 1)];
        },
        changeHrefSettings: (
            state: SettingsState,
            action: PayloadAction<{ index: number; nextValue: string }>,
        ) => {
            const { index, nextValue } = action.payload;

            if (index < 0 || index >= state.hrefs.length) {
                return;
            }

            state.hrefs[index].value = nextValue;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoadAvatar.pending, (state: SettingsState) => {
                state.isPending = true;
            })
            .addCase(GetUserByCookie.fulfilled, (state: SettingsState, action) => {
                const data = action.payload as UserResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.user = data.user;
                state.avatar.URL = undefined;
                state.avatar.error = undefined;
                state.avatar.file = undefined;
                state.usernameError = undefined;
                state.hrefs = [];
                state.skillsToLearnError = undefined;
                state.skillsToShareError = undefined;

                if (state.user !== undefined) {
                    state.user.hrefs?.forEach((href) => {
                        state.hrefs.push({
                            value: href,
                            error: undefined,
                        });
                    });
                }
            })
            .addCase(TryAuth.fulfilled, (state: SettingsState, action) => {
                const data = action.payload as UserResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.user = data.user;
                state.avatar.URL = undefined;
                state.avatar.error = undefined;
                state.avatar.file = undefined;
                state.usernameError = undefined;
                state.hrefs = [];
                state.skillsToLearnError = undefined;
                state.skillsToShareError = undefined;

                if (state.user !== undefined) {
                    state.user.hrefs?.forEach((href) => {
                        state.hrefs.push({
                            value: href,
                            error: undefined,
                        });
                    });
                }
            })
            .addCase(TryRegister.fulfilled, (state: SettingsState, action) => {
                const data = action.payload as UserResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.user = data.user;
                state.avatar.URL = undefined;
                state.avatar.error = undefined;
                state.avatar.file = undefined;
                state.usernameError = undefined;
                state.hrefs = [];
                state.skillsToLearnError = undefined;
                state.skillsToShareError = undefined;

                if (state.user !== undefined) {
                    state.user.hrefs?.forEach((href) => {
                        state.hrefs.push({
                            value: href,
                            error: undefined,
                        });
                    });
                }
            })
            .addCase(GetProfile.fulfilled, (state: SettingsState, action) => {
                const data = action.payload as UserResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                const profile = data.user;

                if (
                    profile !== undefined &&
                    state.user !== undefined &&
                    profile.id === state.user.id
                ) {
                    state.user = profile;
                }

                state.avatar.URL = undefined;
                state.avatar.error = undefined;
                state.avatar.file = undefined;
                state.usernameError = undefined;
                state.hrefs = [];
                state.skillsToLearnError = undefined;
                state.skillsToShareError = undefined;

                if (state.user !== undefined) {
                    state.user.hrefs?.forEach((href) => {
                        state.hrefs.push({
                            value: href,
                            error: undefined,
                        });
                    });
                }
            })
            .addCase(UpdateProfile.pending, (state: SettingsState) => {
                state.isPending = true;
            })
            .addCase(UpdateProfile.fulfilled, (state: SettingsState, action) => {
                state.isPending = false;

                const data = action.payload as UserResponse;

                if (data.status === CODE_OK) {
                    state.user = data.user;
                    state.isUpdated = true;

                    return;
                }

                state.bioError = undefined;
                state.usernameError = undefined;
                state.skillsToLearnError = undefined;
                state.skillsToShareError = undefined;

                if (data.error !== undefined) {
                    switch (data.error.error) {
                        case SETTINGS_USERNAME_EXIST:
                            state.usernameError = USERNAME_ALREADY_EXISTS;
                            break;
                        case SETTINGS_PROFANITY_DETECTED:
                            if (data.error.profanity_error_fields?.includes('Username')) {
                                state.usernameError = BAD_USERNAME;
                            }

                            if (data.error.profanity_error_fields?.includes('Bio')) {
                                state.bioError = BAD_BIO;
                            }
                    }
                }
            })
            .addCase(LoadAvatar.fulfilled, (state: SettingsState, action) => {
                state.isPending = false;
                const data = action.payload as LoadAvatarResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                state.avatar.URL = data.avatarURL;
            })
            .addCase(GetCategories.fulfilled, (state: SettingsState, action) => {
                const data = action.payload as CategoryResponse;

                if (data.status !== CODE_OK) {
                    return;
                }

                data.categories.forEach((category) => {
                    state.globalSkills = [...state.globalSkills, ...category.skills];
                });

                state.globalSkills = state.globalSkills
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

                /* eslint-disable */
                console.log(state.globalSkills);
                /* eslint-enable */
            });
    },
});

export const {
    addHrefSettings,
    deleteHrefSettings,
    changeHrefSettings,
    clearSettings,
    setAvatar,
    setBio,
    setUsername,
    setPreferredFormat,
    clearUpdated,
    editedSkillToLearn,
    editedSkillToLearnLevel,
    editedSkillToShare,
    editedSkillToShareLevel,
    addSkillToLearn,
    addSkillToShare,
    deleteSkillFromLearn,
    deleteSkillFromShare,
} = settingsSlice.actions;

export default settingsSlice.reducer;
