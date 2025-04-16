import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes'
import { CODE_OK } from '../../shared/Consts/Codes';
import { GetCategories, LoadAvatar, TryAuth, TryRegister } from '../../pages/Auth/api/Auth';
import { AvatarFieldState, CategoryResponse, CommunicationFormat, LoadAvatarResponse, SkillLevel, UserResponse } from '../../shared/Consts/Interfaces';
import { GetUserByCookie } from '../../entity/User/api/User';
import { ValidateAvatarExtension, ValidateAvatarSize, ValidateHref, ValidateUsername } from '../../shared/Functions/Validators';
import { GetProfile } from '../../pages/Profile/api/Profile';
import { UpdateProfile } from '../../pages/Settings/api/Settings';
import { MAX_HREFS_COUNT, WRONG_HREF } from '../../shared/Consts/ValidatorsConts';

export interface SettingsState {
    user: ProfileType | undefined,
    usernameError: string | undefined,
    isUpdated: boolean,
    globalSkills: string[],
    avatar: AvatarFieldState,
    isPending: boolean,
    hrefs: {
        value: string,
        error: string | undefined,
    }[],
}

const initialState: SettingsState = {
    user: undefined,
    usernameError: undefined,
    isUpdated: false,
    globalSkills: [],
    avatar: {
        URL: undefined,
        error: undefined,
        file: undefined,
    },
    isPending: false,
    hrefs: [],
}

export const settingsSlice = createSlice({
  name: 'structurizedMessage',
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
            state.usernameError = 'Длина имени - от 3 до 25 символов. Содержит только символы латинского алфавита, нижние подчеркивания и точки';
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
    addSkillToLearn: (state: SettingsState) => {
        if (state.user === undefined) {
            return;
        }

        state.user.skills_to_learn.push({name: state.globalSkills[0], level: "beginner", description: ''});
    },
    deleteSkillFromLearn: (state: SettingsState, action: PayloadAction<string>) => {
        const skillName: string = action.payload;

        if (state.user === undefined) {
            return;
        }

        const index: number = state.user.skills_to_learn.findIndex((skill) => skill.name === skillName);

        if (index === -1) {
            return;
        }

        state.user.skills_to_learn = [...state.user.skills_to_learn.slice(0, index), ...state.user.skills_to_learn.slice(index + 1)];
    },
    editedSkillToLearn: (state: SettingsState, action: PayloadAction<[number, string]>) => {
        const [index, skillName] = action.payload;

        if (state.user === undefined) {
            return;
        }

        state.user.skills_to_learn[index].name = skillName;
    },
    editedSkillToLearnLevel: (state: SettingsState, action: PayloadAction<[number, string]>) => {
        const [index, skillLevel] = action.payload;

        if (state.user === undefined) {
            return;
        }

        state.user.skills_to_learn[index].level = skillLevel as SkillLevel;
    },
    addSkillToShare: (state: SettingsState) => {
        if (state.user === undefined) {
            return;
        }

        state.user.skills_to_share.push({name: state.globalSkills[0], level: "beginner", description: ''});
    },
    deleteSkillFromShare: (state: SettingsState, action: PayloadAction<string>) => {
        const skillName: string = action.payload;

        if (state.user === undefined) {
            return;
        }

        const index: number = state.user.skills_to_share.findIndex((skill) => skill.name === skillName);

        if (index === -1) {
            return;
        }

        state.user.skills_to_share = [...state.user.skills_to_share.slice(0, index), ...state.user.skills_to_share.slice(index + 1)];
    },
    editedSkillToShare: (state: SettingsState, action: PayloadAction<[number, string]>) => {
        const [index, skillName] = action.payload;

        if (state.user === undefined) {
            return;
        }

        state.user.skills_to_share[index].name = skillName;
    },
    editedSkillToShareLevel: (state: SettingsState, action: PayloadAction<[number, string]>) => {
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
    clearSettings: (state: SettingsState) => {
        state.isUpdated = false;
        state.avatar.URL = undefined;
        state.avatar.file = undefined;
        state.avatar.error = undefined;
        state.usernameError = undefined;
        state.hrefs = [];
    },
    addHrefSettings: (state: SettingsState) => {
        if (state.hrefs.length === MAX_HREFS_COUNT) {
            return;
        }

        state.hrefs.push({
            value: 'https://',
            error: WRONG_HREF,
        });
    },
    deleteHrefSettings: (state: SettingsState, action: PayloadAction<number>) => {
        const index = action.payload;

        if (index < 0 || index >= state.hrefs.length) {
            return;
        }

        state.hrefs = [...state.hrefs.slice(0, index), ...state.hrefs.slice(index + 1)];
    },
    changeHrefSettings: (state: SettingsState, action: PayloadAction<{index: number, nextValue: string}>) => {
        const {index, nextValue} = action.payload;

        if (index < 0 || index >= state.hrefs.length) {
            return;
        }

        state.hrefs[index].value = nextValue;

        const isValid: boolean = ValidateHref(nextValue);

        if (!isValid) {
            state.hrefs[index].error = WRONG_HREF;
        } else {
            state.hrefs[index].error = undefined;
        }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoadAvatar.pending, (state: SettingsState) => {
        state.isPending = true;
    }).addCase(LoadAvatar.fulfilled, (state: SettingsState) => {
        state.isPending = false;
    }).addCase(GetUserByCookie.fulfilled, (state: SettingsState, action) => {
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

        if (state.user !== undefined) {
            state.user.hrefs?.forEach((href) => {
                state.hrefs.push({
                    value: href,
                    error: (ValidateHref(href) ? undefined : WRONG_HREF),
                })
            });
        }
    }).addCase(TryAuth.fulfilled, (state: SettingsState, action) => {
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

        if (state.user !== undefined) {
            state.user.hrefs?.forEach((href) => {
                state.hrefs.push({
                    value: href,
                    error: (ValidateHref(href) ? undefined : WRONG_HREF),
                })
            });
        }
    }).addCase(TryRegister.fulfilled, (state: SettingsState, action) => {
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

        if (state.user !== undefined) {
            state.user.hrefs?.forEach((href) => {
                state.hrefs.push({
                    value: href,
                    error: (ValidateHref(href) ? undefined : WRONG_HREF),
                })
            });
        }
    }).addCase(GetProfile.fulfilled, (state: SettingsState, action) => {
        const data = action.payload as UserResponse;

        if (data.status !== CODE_OK) {
            return;
        }

        const profile = data.user;
        console.log(data);

        if (profile !== undefined && state.user !== undefined && profile.id === state.user.id) {
            state.user = profile;
        }

        state.avatar.URL = undefined;
        state.avatar.error = undefined;
        state.avatar.file = undefined;
        state.usernameError = undefined;
        state.hrefs = [];

        if (state.user !== undefined) {
            state.user.hrefs?.forEach((href) => {
                state.hrefs.push({
                    value: href,
                    error: (ValidateHref(href) ? undefined : WRONG_HREF),
                })
            });
        }
    }).addCase(UpdateProfile.pending, (state: SettingsState) => {
        state.isPending = true;
    }).addCase(UpdateProfile.fulfilled, (state: SettingsState, action) => {
        state.isPending = false;

        const data = action.payload as UserResponse;

        if (data.status !== CODE_OK) {
            return;
        }

        state.user = data.user;
        state.isUpdated = true;
    }).addCase(LoadAvatar.fulfilled, (state: SettingsState, action) => {
        const data = action.payload as LoadAvatarResponse;

        if (data.status !== CODE_OK) {
            return;
        }

        state.avatar.URL = data.avatarURL;
        console.log(state.avatar.URL);
    }).addCase(GetCategories.fulfilled, (state: SettingsState, action) => {
        const data = action.payload as CategoryResponse;

        if (data.status !== CODE_OK) {
            return;
        }

        data.categories.forEach((category) => {
            state.globalSkills = [...state.globalSkills, ...category.skills]
        });

        state.globalSkills = state.globalSkills.filter((value, index, array) => array.indexOf(value) === index).sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    });
  },
})

export const { addHrefSettings, deleteHrefSettings, changeHrefSettings, clearSettings, setAvatar, setBio, setUsername, setPreferredFormat, clearUpdated, editedSkillToLearn, editedSkillToLearnLevel, editedSkillToShare, editedSkillToShareLevel, addSkillToLearn, addSkillToShare, deleteSkillFromLearn, deleteSkillFromShare } = settingsSlice.actions

export default settingsSlice.reducer