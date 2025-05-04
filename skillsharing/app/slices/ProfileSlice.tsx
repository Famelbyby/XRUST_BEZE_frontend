import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import {
    AddReviewResponse,
    DeleteReviewResponse,
    UserResponse,
} from '../../shared/Consts/Interfaces';
import { AddReview, DeleteReview, GetProfile, UpdateReview } from '../../pages/Profile/api/Profile';
import { CODE_CREATED, CODE_DELETED, CODE_OK } from '../../shared/Consts/Codes';

export interface ProfileState {
    user: ProfileType | undefined;
    isFetched: boolean;
    isHiddenDeleteReview: boolean;
    deleteReviewId: string;
    updatingReviewId: string;
}

const initialState: ProfileState = {
    user: undefined,
    isFetched: false,
    isHiddenDeleteReview: true,
    deleteReviewId: '',
    updatingReviewId: '',
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfile: (state: ProfileState) => {
            state.user = undefined;
            state.isFetched = false;
            state.isHiddenDeleteReview = true;
            state.deleteReviewId = '';
            state.updatingReviewId = '';
        },
        setIsHiddenDeleteReview: (
            state: ProfileState,
            action: PayloadAction<{ id?: string; bool: boolean }>,
        ) => {
            state.isHiddenDeleteReview = action.payload.bool;
            state.deleteReviewId = action.payload.id || '';
        },
        hideDeleteReviewModal: (state: ProfileState) => {
            state.isHiddenDeleteReview = true;
            state.deleteReviewId = '';
        },
        setUpdatingReviewId: (state: ProfileState, action: PayloadAction<string>) => {
            state.updatingReviewId = action.payload;
        },
        cancelUpdatingReview: (state: ProfileState) => {
            state.updatingReviewId = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetProfile.fulfilled, (state: ProfileState, action) => {
                const data = action.payload as UserResponse;

                state.isFetched = true;
                state.user = data.user;
            })
            .addCase(DeleteReview.fulfilled, (state: ProfileState, action) => {
                const response = action.payload as DeleteReviewResponse;

                if (response.status !== CODE_DELETED) {
                    return;
                }

                const reviewId = response.reviewId;

                if (state.user?.reviews) {
                    state.user.reviews = state.user.reviews.filter(
                        (review) => review.id !== reviewId,
                    );
                }
            })
            .addCase(AddReview.fulfilled, (state: ProfileState, action) => {
                const response = action.payload as unknown as AddReviewResponse;

                if (response.status !== CODE_CREATED) {
                    return;
                }

                if (state.user !== undefined) {
                    state.user.reviews = [response.newReview, ...(state.user.reviews || [])];
                }
            })
            .addCase(UpdateReview.fulfilled, (state: ProfileState, action) => {
                const response = action.payload as unknown as AddReviewResponse;

                if (response.status !== CODE_OK) {
                    return;
                }

                const newReview = response.newReview;

                if (state.user !== undefined) {
                    state.user.reviews = (state.user.reviews || []).map((review) => {
                        if (newReview.id !== review.id) {
                            return review;
                        }

                        return newReview;
                    });
                }

                state.updatingReviewId = '';
            });
    },
});

export const {
    setUpdatingReviewId,
    cancelUpdatingReview,
    hideDeleteReviewModal,
    setIsHiddenDeleteReview,
    clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
