import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IMessage} from './MessageTypes'

export interface MessagesState {
  messages: IMessage[],
  selectedMessages: IMessage[],
  channelID: string,
}

const initialState: MessagesState = {
  messages: [],
  selectedMessages: [],
  channelID: "",
}

export const messagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    setChannelID: (state: MessagesState, action: PayloadAction<MessagesState["channelID"]>) => {
      state.channelID = action.payload;
    },
    replaceMessages: (state: MessagesState, action: PayloadAction<IMessage[]>) => {
        state.messages = action.payload;
    },
    addMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
        const newMessage: IMessage = action.payload;

        if (state.channelID !== newMessage.channel_id && state.channelID !== newMessage.user_id) {
          return;
        }

        state.messages = [action.payload, ...state.messages];
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

export const { addMessage, replaceMessages, toggleSelectedMessage, removeSelectedMessages, deleteMessage, setChannelID } = messagesSlice.actions

export default messagesSlice.reducer