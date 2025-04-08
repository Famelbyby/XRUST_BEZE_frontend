import { createSlice } from '@reduxjs/toolkit'
import { IMessage } from '../../entity/Message/MessageTypes';
import { GetMessageById } from '../../pages/StructurizedMessage/api/StructurizedMessage';
import { MessageResponse } from '../../shared/Consts/Interfaces';
import { CODE_OK } from '../../shared/Consts/Codes';
import { GetFoundByNameUsers } from '../../pages/Main/api/Main';

export interface StructurizedMessageState {
    message: IMessage | undefined,
    badMessageError: boolean,
}

const initialState: StructurizedMessageState = {
    badMessageError: false,
    message: undefined,
}

export const structurizedMessageSlice = createSlice({
  name: 'structurizedMessage',
  initialState,
  reducers: {
    clearMessage: (state: StructurizedMessageState) => {
        state.badMessageError = false;
        state.message = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMessageById.fulfilled, (state: StructurizedMessageState, action) => {
        const response = action.payload as unknown as MessageResponse;

        if (response.status !== CODE_OK) {
            state.badMessageError = true;
            return;
        }

        const {message, userId} = response.messageData;

        if (message.structurized === undefined) {
            state.badMessageError = true;
            return;
        }

        if (message.user_id !== userId && message.peer_id !== userId) {
            state.badMessageError = true;
            return;
        }

        state.message = message;
    });
  },
})

export const { clearMessage } = structurizedMessageSlice.actions

export default structurizedMessageSlice.reducer