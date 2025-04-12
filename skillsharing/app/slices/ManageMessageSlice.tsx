import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MAX_ATTACHMENTS_LENGTH } from '../../shared/Consts/ValidatorsConts';
import { ValidateAttachments } from '../../shared/Functions/Validators';
import { LoadAttachments } from '../../pages/Chat/api/Chat';
import { LoadAttachmentsResponse } from '../../shared/Consts/Interfaces';

export interface ManageMessageState {
    attachments: File[],
    inputText: string,
    oldAttachments: string[],
    attachmentsUploaded: boolean,
    attachmentURLs: undefined | string[],
}

const initialState: ManageMessageState = {
    inputText: '',
    attachments: [],
    oldAttachments: [],
    attachmentsUploaded: false,
    attachmentURLs: undefined,
}

export const manageMessageSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    setInputText: (state: ManageMessageState, action: PayloadAction<string>) => {
        state.inputText = action.payload;
    },
    addAttachment: (state: ManageMessageState, action: PayloadAction<File>) => {
        if (state.attachments.length === MAX_ATTACHMENTS_LENGTH) {
            return;
        }

        const newAttachment = action.payload;
        const isValid: boolean = ValidateAttachments(state.attachments, newAttachment);

        if (!isValid) {
            return;
        } else {
            state.attachments.push(newAttachment);
        }        
    },
    deleteAttachment: (state: ManageMessageState, action: PayloadAction<number>) => {
        const index = action.payload;

        if (index < 0) {
            return;
        }

        if (index > state.attachments.length) {
            state.oldAttachments = [...state.oldAttachments.slice(0, index), ...state.oldAttachments.slice(index + 1)];
        } else {
            state.attachments = [...state.attachments.slice(0, index), ...state.attachments.slice(index + 1)];
        }
    },
    clearInputAndAttachments: (state: ManageMessageState) => {
        state.attachments = [];
        state.inputText = '';
        state.attachmentsUploaded = false;
        state.attachmentURLs = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoadAttachments.fulfilled, (state: ManageMessageState, action) => {
        const data = action.payload as LoadAttachmentsResponse;

        state.attachmentsUploaded = true;
        state.attachmentURLs = data.resultURLs.map((resultURL) => resultURL.data.filename);
    });
  },
})

export const { clearInputAndAttachments, deleteAttachment, addAttachment, setInputText } = manageMessageSlice.actions

export default manageMessageSlice.reducer