import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DialogItem } from '../../entity/Dialog/ui/DialogTypes';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import { GetDialogs, GetLastMessage } from '../../pages/Dialogs/api/Dialogs';
import { DialogsResponse, GetLastMessageResponse, Skill } from '../../shared/Consts/Interfaces';
import { CODE_OK } from '../../shared/Consts/Codes';
import { IMessage } from '../../entity/Message/MessageTypes';

export interface DialogsState {
    dialogs: DialogItem[] | undefined;
    filteredDialogs: DialogItem[] | undefined;
    isServerError: boolean;
}

const initialState: DialogsState = {
    dialogs: undefined,
    filteredDialogs: undefined,
    isServerError: false,
};

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        filterDialogs: (
            state: DialogsState,
            action: PayloadAction<{ selectedTags: string[]; user: ProfileType }>,
        ) => {
            const { selectedTags, user } = action.payload;

            if (selectedTags.length === 0) {
                state.filteredDialogs = state.dialogs;
                return;
            }

            if (state.dialogs !== undefined) {
                state.filteredDialogs = state.dialogs.filter((dialog: DialogItem) => {
                    if (user === undefined) {
                        return;
                    }

                    const dialogCompanion: ProfileType | undefined = dialog.users.find(
                        (dialogUser: ProfileType) => dialogUser.id !== user.id,
                    );

                    if (dialogCompanion === undefined) {
                        return true;
                    }

                    let isFiltered = false;

                    selectedTags.forEach((selectedTag: string) => {
                        isFiltered =
                            isFiltered ||
                            dialogCompanion.skills_to_share.find(
                                (skill: Skill) => skill.name === selectedTag,
                            ) !== undefined;
                    });

                    return isFiltered;
                });
            }
        },
        clearAll: (state: DialogsState) => {
            state.dialogs = undefined;
            state.filteredDialogs = undefined;
            state.isServerError = false;
        },
        replaceNewMessage: (state: DialogsState, action: PayloadAction<IMessage>) => {
            if (state.filteredDialogs === undefined || state.dialogs === undefined) {
                return;
            }

            const newMessage = action.payload;

            state.dialogs.forEach((dialog, index) => {
                if (dialog.channel_id === newMessage.channel_id) {
                    state.dialogs![index].last_message = newMessage;
                }
            });

            state.filteredDialogs.forEach((filteredDialog, index) => {
                if (filteredDialog.channel_id === newMessage.channel_id) {
                    state.filteredDialogs![index].last_message = newMessage;
                }
            });
        },
        replaceUpdatedMessage: (state: DialogsState, action: PayloadAction<IMessage>) => {
            if (state.filteredDialogs === undefined || state.dialogs === undefined) {
                return;
            }

            const newMessage = action.payload;

            state.dialogs.forEach((dialog, index) => {
                if (
                    dialog.channel_id === newMessage.channel_id &&
                    dialog.last_message!.message_id === newMessage.message_id
                ) {
                    state.dialogs![index].last_message = newMessage;
                }
            });

            state.filteredDialogs.forEach((filteredDialog, index) => {
                if (
                    filteredDialog.channel_id === newMessage.channel_id &&
                    filteredDialog.last_message!.message_id === newMessage.message_id
                ) {
                    state.filteredDialogs![index].last_message = newMessage;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetDialogs.fulfilled, (state: DialogsState, action) => {
                const data = action.payload as DialogsResponse;

                if (data.status !== CODE_OK) {
                    state.isServerError = true;
                    return;
                }

                state.isServerError = false;

                if (data.dialogs === null) {
                    data.dialogs = [];
                }

                const newDialogs: DialogItem[] = data.dialogs;

                state.dialogs = newDialogs.filter(
                    (dialog: DialogItem) => dialog.last_message !== null,
                );
                state.filteredDialogs = state.dialogs;
            })
            .addCase(GetLastMessage.fulfilled, (state: DialogsState, action) => {
                const data = action.payload as GetLastMessageResponse;

                if (data!.status !== CODE_OK) {
                    return;
                }

                if (state.filteredDialogs === undefined) {
                    return;
                }

                if (data!.messages.length === 0) {
                    state.dialogs!.forEach((dialog, index) => {
                        if (dialog.channel_id === data!.channelId) {
                            state.dialogs = [
                                ...state.dialogs!.slice(0, index),
                                ...state.dialogs!.slice(index + 1),
                            ];
                        }
                    });
                    state.filteredDialogs.forEach((filteredDialog, index) => {
                        if (filteredDialog.channel_id === data!.channelId) {
                            state.filteredDialogs = [
                                ...state.filteredDialogs!.slice(0, index),
                                ...state.filteredDialogs!.slice(index + 1),
                            ];
                        }
                    });

                    return;
                }

                const newLastMessage = data!.messages[0] as IMessage;

                state.filteredDialogs.forEach((filteredDialog, index) => {
                    if (filteredDialog.channel_id === newLastMessage.channel_id) {
                        state.filteredDialogs![index].last_message = newLastMessage;
                    }
                });
            });
    },
});

export const { filterDialogs, clearAll, replaceNewMessage, replaceUpdatedMessage } =
    dialogsSlice.actions;

export default dialogsSlice.reducer;
