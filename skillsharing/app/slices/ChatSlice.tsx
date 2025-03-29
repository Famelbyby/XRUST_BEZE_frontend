import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IMessage} from '../../entity/Message/MessageTypes'
import { GetChatMessages, GetCompanion } from '../../pages/Chat/api/Chat'
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes'

export interface MessagesState {
  messages: IMessage[] | undefined,
  selectedMessages: IMessage[] | undefined,
  channelID: string,
  peerID: string | undefined,
  editingMessage: IMessage | null,
  companion: ProfileType | undefined,
}

const initialState: MessagesState = {
  messages: undefined,
  selectedMessages: undefined,
  channelID: "",
  peerID: undefined,
  editingMessage: null,
  companion: undefined,
}

export const chatSlice = createSlice({
  name: 'chatMessages',
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
    setPeerID: (state: MessagesState, action: PayloadAction<MessagesState["peerID"]>) => {
      state.peerID = action.payload;
    },
    clearAllMessages: (state: MessagesState) => {
      state.peerID = "";
      state.channelID = "";
      state.messages = [];
      state.selectedMessages = [];
      state.editingMessage = null;
    },
    replaceMessages: (state: MessagesState, action: PayloadAction<IMessage[]>) => {
        const messages: IMessage[] = action.payload;

        state.messages = messages;
        state.selectedMessages = [];

        if (messages.length > 0) {
          state.channelID = messages[0].channel_id!;
        }

        console.log(state.messages, state.channelID);
    },
    addMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
        const newMessage: IMessage = action.payload;

        if (state.channelID === "") {
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

      if (state.channelID !== updatedMessage.channel_id) {
        return;
      }

      if (state.messages === undefined) {
        return;
      }

      const messageIndex: number = state.messages.findIndex((message) => message.message_id === updatedMessage.message_id);

      if (messageIndex !== -1) {
        state.messages = [...state.messages.slice(0, messageIndex), updatedMessage, ...state.messages.slice(messageIndex + 1)];
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

      const messageIndex: number = state.messages.findIndex((message: IMessage) => message.message_id === messageForDelete.message_id);

      if (messageIndex !== -1) {
        state.messages = [...state.messages.slice(0, messageIndex), ...state.messages.slice(messageIndex + 1)];
      }
    },
    toggleSelectedMessage: (state: MessagesState, action: PayloadAction<string>) => {
      if (state.selectedMessages === undefined || state.messages === undefined) {
        return;
      }

        const messageID: string = action.payload;
        const selectedMessage: IMessage | undefined = state.selectedMessages.find((message) => message.message_id === messageID);

        if (selectedMessage === undefined) {
            state.selectedMessages = [state.messages.find((message) => message.message_id === messageID)!, ...state.selectedMessages];
        } else {
            const selectedMessageIndex: number = state.selectedMessages.indexOf(selectedMessage);

            state.selectedMessages = [...state.selectedMessages.slice(0, selectedMessageIndex), ...state.selectedMessages.slice(selectedMessageIndex + 1)];
        }
    },
    removeSelectedMessages: (state: MessagesState) => {
      state.selectedMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetChatMessages.fulfilled, (state: MessagesState, action) => {
      const messages: IMessage[] = action.payload as IMessage[];

      state.messages = messages;
      state.selectedMessages = [];

      if (messages.length > 0) {
        state.channelID = messages[0].channel_id!;
      }

      console.log(state.messages, state.channelID);
    }).addCase(GetCompanion.fulfilled, (state: MessagesState, action) => {
      const profile = action.payload as ProfileType | undefined

      state.companion = profile;
      
      if (profile !== undefined) {
        state.peerID = profile.id;
      }
    });
  },
})

export const { clearAllMessages, addMessage, replaceMessages, toggleSelectedMessage, removeSelectedMessages, deleteMessage, setPeerID, editMessage, stopEditingMessage, updateMessage } = chatSlice.actions

export default chatSlice.reducer