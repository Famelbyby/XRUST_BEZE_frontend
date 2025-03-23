import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IMessage} from './MessageTypes'

export interface MessagesState {
  messages: IMessage[],
  selectedMessages: IMessage[],
  channelID: string,
  editingMessage: IMessage | null,
}

const initialState: MessagesState = {
  messages: [],
  selectedMessages: [],
  channelID: "",
  editingMessage: null,
}

export const messagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    editMessage: (state: MessagesState) => {
      state.editingMessage = state.selectedMessages[0];
      state.selectedMessages = [];
    },
    stopEditingMessage: (state: MessagesState) => {
      state.editingMessage = null;
    },
    setChannelID: (state: MessagesState, action: PayloadAction<MessagesState["channelID"]>) => {
      state.channelID = action.payload;
    },
    replaceMessages: (state: MessagesState, action: PayloadAction<IMessage[]>) => {
        state.messages = action.payload;
        state.selectedMessages = [];
    },
    addMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
        const newMessage: IMessage = action.payload;

        if (state.channelID !== newMessage.channel_id && state.channelID !== newMessage.user_id) {
          return;
        }

        state.messages = [action.payload, ...state.messages];
    },
    updateMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
      const updatedMessage: IMessage = action.payload;

      console.log('jsad');

      if (state.channelID !== updatedMessage.channel_id && state.channelID !== updatedMessage.user_id) {
        return;
      }

      console.log('jsad');

      const messageIndex: number = state.messages.findIndex((message) => message.message_id === updatedMessage.message_id);

      console.log(messageIndex);
      if (messageIndex !== -1) {
        console.log('here')
        state.messages = [...state.messages.slice(0, messageIndex), updatedMessage, ...state.messages.slice(messageIndex + 1)];
      }
    },
    deleteMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
      const messageForDelete: IMessage = action.payload;

      if (state.channelID !== messageForDelete.channel_id && state.channelID !== messageForDelete.user_id) {
        return;
      }

      const messageIndex: number = state.messages.findIndex((message: IMessage) => message.message_id === messageForDelete.message_id);

      if (messageIndex !== -1) {
        state.messages = [...state.messages.slice(0, messageIndex), ...state.messages.slice(messageIndex + 1)];
      }
    },
    toggleSelectedMessage: (state: MessagesState, action: PayloadAction<string>) => {
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
})

export const { addMessage, replaceMessages, toggleSelectedMessage, removeSelectedMessages, deleteMessage, setChannelID, editMessage, stopEditingMessage, updateMessage } = messagesSlice.actions

export default messagesSlice.reducer