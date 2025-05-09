import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../entity/Message/MessageTypes';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import { ChannelReponse, UserResponse } from '../../shared/Consts/Interfaces';
import { CODE_NOT_FOUND } from '../../shared/Consts/Codes';
import { GetChannelByIds, GetCompanion } from '../../pages/Chat/api/Chat';

export interface MessagesState {
    messages: IMessage[] | undefined;
    selectedMessages: IMessage[] | undefined;
    channelID: string;
    peerID: string | undefined;
    editingMessage: IMessage | null;
    companion: ProfileType | undefined;
    isFetched: boolean;
    noPeerError: boolean;
    noChatError: boolean;
    isHiddenDeletingModal: boolean;
    isHiddenStructurizedModal: boolean;
    structurizingMessages: Array<string>;
    structurizedMessageId: string;
}

const initialState: MessagesState = {
    messages: undefined,
    selectedMessages: undefined,
    channelID: '',
    peerID: undefined,
    editingMessage: null,
    companion: undefined,
    isFetched: false,
    noPeerError: false,
    noChatError: false,
    isHiddenDeletingModal: true,
    isHiddenStructurizedModal: true,
    structurizingMessages: [],
    structurizedMessageId: '',
};

export const chatSlice = createSlice({
    name: 'recorder',
    initialState,
    reducers: {
        editMessage: (state: MessagesState) => {
            if (state.selectedMessages === undefined) {
                return;
            }

            state.editingMessage = state.selectedMessages[0];
            state.selectedMessages = [];
        },
        stopEditingMessage: (state: MessagesState) => {
            state.editingMessage = null;
        },
        clearAllMessages: (state: MessagesState) => {
            state.peerID = '';
            state.channelID = '';
            state.messages = undefined;
            state.selectedMessages = undefined;
            state.editingMessage = null;
            state.noPeerError = false;
            state.noChatError = false;
            state.structurizedMessageId = '';
            state.structurizingMessages = [];
            state.companion = undefined;
            state.isFetched = false;
            state.isHiddenDeletingModal = true;
            state.isHiddenStructurizedModal = true;
        },
        replaceMessages: (state: MessagesState, action: PayloadAction<IMessage[]>) => {
            const messages: IMessage[] = action.payload;

            state.messages = messages;
            state.selectedMessages = [];

            if (messages.length > 0) {
                state.channelID = messages[0].channel_id!;
            }
        },
        addMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
            const newMessage: IMessage = action.payload;

            if (state.channelID === '') {
                state.channelID = newMessage.channel_id!;
            }

            if (state.channelID !== newMessage.channel_id) {
                return;
            }

            if (state.messages === undefined) {
                return;
            }

            state.messages = [action.payload, ...state.messages];
        },
        updateMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
            const updatedMessage: IMessage = action.payload;

            if (updatedMessage.event === 'EventStructurization') {
                const messageIndex: number = state.structurizingMessages.indexOf(
                    updatedMessage.message_id,
                );

                if (messageIndex !== -1) {
                    state.structurizingMessages = [
                        ...state.structurizingMessages.slice(0, messageIndex),
                        ...state.structurizingMessages.slice(messageIndex + 1),
                    ];
                }
            }

            if (state.channelID !== updatedMessage.channel_id) {
                return;
            }

            if (state.messages === undefined) {
                return;
            }

            const messageIndex: number = state.messages.findIndex(
                (message) => message.message_id === updatedMessage.message_id,
            );

            if (messageIndex !== -1) {
                state.messages = [
                    ...state.messages.slice(0, messageIndex),
                    updatedMessage,
                    ...state.messages.slice(messageIndex + 1),
                ];
            }
        },
        deleteMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
            const messageForDelete: IMessage = action.payload;

            if (state.channelID !== messageForDelete.channel_id) {
                return;
            }

            if (state.messages === undefined) {
                return;
            }

            const messageIndex: number = state.messages.findIndex(
                (message: IMessage) => message.message_id === messageForDelete.message_id,
            );

            if (messageIndex !== -1) {
                state.messages = [
                    ...state.messages.slice(0, messageIndex),
                    ...state.messages.slice(messageIndex + 1),
                ];
            }
        },
        addStructurizingMessage: (state: MessagesState, action: PayloadAction<string>) => {
            state.structurizingMessages.push(action.payload);
        },
        toggleSelectedMessage: (state: MessagesState, action: PayloadAction<string>) => {
            if (state.selectedMessages === undefined || state.messages === undefined) {
                return;
            }

            const messageID: string = action.payload;
            const selectedMessage: IMessage | undefined = state.selectedMessages.find(
                (message) => message.message_id === messageID,
            );

            if (selectedMessage === undefined) {
                state.selectedMessages = [
                    state.messages.find((message) => message.message_id === messageID)!,
                    ...state.selectedMessages,
                ];
            } else {
                const selectedMessageIndex: number =
                    state.selectedMessages.indexOf(selectedMessage);

                state.selectedMessages = [
                    ...state.selectedMessages.slice(0, selectedMessageIndex),
                    ...state.selectedMessages.slice(selectedMessageIndex + 1),
                ];
            }
        },
        removeSelectedMessages: (state: MessagesState) => {
            state.selectedMessages = [];
        },
        hideDeletingModal: (state: MessagesState) => {
            state.isHiddenDeletingModal = true;
        },
        showDeletingModal: (state: MessagesState) => {
            state.isHiddenDeletingModal = false;
        },
        hideStructurizedModal: (state: MessagesState) => {
            state.isHiddenStructurizedModal = true;
        },
        showStructurizedModal: (state: MessagesState, action: PayloadAction<string>) => {
            state.isHiddenStructurizedModal = false;
            state.structurizedMessageId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetChannelByIds.fulfilled, (state: MessagesState, action) => {
                const response = action.payload as unknown as ChannelReponse;

                if (response.status === CODE_NOT_FOUND) {
                    state.noChatError = true;
                    state.noPeerError = false;
                    state.messages = [];
                    state.selectedMessages = [];
                    return;
                }

                const data = response.channelData;

                state.channelID = data.channel.channel_id;

                const messages = data.messages;

                if (messages === undefined || messages === null) {
                    state.messages = [];
                } else {
                    state.messages = messages;
                }

                state.selectedMessages = [];

                const companion = data.channel.users.find(
                    (user: ProfileType) => user.id !== data.userId,
                );

                if (companion === undefined) {
                    state.noPeerError = true;
                    return;
                }

                state.companion = companion;
                state.peerID = companion.id;
            })
            .addCase(GetCompanion.fulfilled, (state: MessagesState, action) => {
                const data = action.payload as unknown as UserResponse;
                const companion = data.user;

                if (companion === undefined) {
                    state.noPeerError = true;
                    return;
                }

                state.companion = companion;
                state.peerID = companion.id;
            });
    },
});

export const {
    addStructurizingMessage,
    hideStructurizedModal,
    showStructurizedModal,
    showDeletingModal,
    hideDeletingModal,
    clearAllMessages,
    addMessage,
    replaceMessages,
    toggleSelectedMessage,
    removeSelectedMessages,
    deleteMessage,
    editMessage,
    stopEditingMessage,
    updateMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
