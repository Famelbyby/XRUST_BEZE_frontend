import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACK_URL, REVIEW_URL, USERS_URL } from '../../../shared/Consts/URLS';
import { CODE_OK } from '../../../shared/Consts/Codes';
import { AddReviewRequest, UpdateReviewRequest } from '../../../shared/Consts/Interfaces';

export const GetProfile = createAsyncThunk('profile/getProfileByID', async (userId: string) => {
    let data: unknown;
    let status: number = CODE_OK;
    let error: string | undefined;

    await axios
        .get(BACK_URL + USERS_URL + `/${userId}`)
        .then((response) => {
            status = response.status;
            data = response.data;
            error = undefined;
        })
        .catch(({ response }) => {
            status = response.status;
            data = undefined;
            error = response.data;
        });

    return { user: data, status: status, error };
});

export const DeleteReview = createAsyncThunk('profile/deleteReview', async (reviewId: string) => {
    let status: number = CODE_OK;
    let error: string | undefined;

    await axios
        .delete(BACK_URL + USERS_URL + REVIEW_URL + `/${reviewId}`)
        .then((response) => {
            status = response.status;
            error = undefined;
        })
        .catch(({ response }) => {
            status = response.status;
            error = response.data;
        });

    return { status: status, error, reviewId };
});

export const AddReview = createAsyncThunk(
    'profile/addReview',
    async ({ text, user_id_by, user_id_to, rating }: AddReviewRequest) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        await axios
            .post(
                BACK_URL + USERS_URL + `/review`,
                JSON.stringify({ text, user_id_by, user_id_to, rating }),
            )
            .then((response) => {
                status = response.status;
                data = response.data;
                error = undefined;
            })
            .catch(({ response }) => {
                status = response.status;
                data = undefined;
                error = response.data;
            });

        return { newReview: data, status: status, error };
    },
);

export const UpdateReview = createAsyncThunk(
    'profile/updateReview',
    async ({ text, reviewId, rating }: UpdateReviewRequest) => {
        let data: unknown;
        let status: number = CODE_OK;
        let error: string | undefined;

        await axios
            .put(BACK_URL + USERS_URL + `/review/${reviewId}`, JSON.stringify({ text, rating }))
            .then((response) => {
                status = response.status;
                data = response.data;
                error = undefined;
            })
            .catch(({ response }) => {
                status = response.status;
                data = undefined;
                error = response.data;
            });

        return { newReview: data, status: status, error };
    },
);
