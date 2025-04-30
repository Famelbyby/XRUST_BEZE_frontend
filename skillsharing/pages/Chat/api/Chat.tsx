import axios from 'axios';
import { BACK_URL, CHAT_URL, USERS_URL } from '../../../shared/Consts/URLS';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CODE_OK } from '../../../shared/Consts/Codes';
import { ChannelRequest } from '../../../shared/Consts/Interfaces';

export const GetChannelByIds = createAsyncThunk(
    'chats/getChannelByIds',
    async ({ userId, peerId }: ChannelRequest) => {
        let status: number = CODE_OK;
        let data: unknown;
        let error: string | undefined;

        await axios
            .get(BACK_URL + CHAT_URL + `/channels/by-peer?user_id=${userId}&peer_id=${peerId}`)
            .then((response) => {
                status = response.status;
                data = { ...response.data, userId };
                error = undefined;
            })
            .catch(({ response }) => {
                status = response.status;
                data = undefined;
                error = response.data;
            });

        return { channelData: data, status: status, error, userId };
    },
);

export const LoadVoiceRecord = createAsyncThunk('chats/loadVoiceRecord', async (record: Blob) => {
    let status: number = CODE_OK;
    let data: string | undefined;
    let error: string | undefined;

    const formData = new FormData();
    formData.append('file', record);

    await axios
        .post(BACK_URL + '/file/temp', formData, {
            headers: {
                'Content-Type': 'mulpipart/form-data',
            },
        })
        .then((response) => {
            status = response.status;
            data = response.data.filename;
            error = undefined;
        })
        .catch(({ response }) => {
            status = response.status;
            data = undefined;
            error = response.data;
        });

    return { recordURL: data as string, status, error };
});

export const LoadAttachments = createAsyncThunk(
    'chats/loadAttachments',
    async (attachments: File[]) => {
        const promises: Promise<{ status: number; data: { filename: string } }>[] = [];

        attachments.forEach((attachment) => {
            const formData = new FormData();
            formData.append('file', attachment, attachment.name);

            promises.push(
                axios.post(BACK_URL + '/file/temp', formData, {
                    headers: {
                        'Content-Type': 'mulpipart/form-data',
                    },
                }),
            );
        });

        const resultURLs = await Promise.all(promises);

        return { resultURLs };
    },
);

export const GetCompanion = createAsyncThunk('chat/getCompanionByID', async (peerId: string) => {
    let data: unknown;
    let status: number = CODE_OK;

    await axios
        .get(BACK_URL + USERS_URL + `/${peerId}`)
        .then((response) => {
            ({ status, data } = response);
        })
        .catch(({ response }) => {
            status = response.status;
            data = undefined;
        });

    return { user: data, status };
});
