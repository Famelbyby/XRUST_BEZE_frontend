import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import { DeleteReviewResponse, UserResponse } from '../../shared/Consts/Interfaces';
import { DeleteReview, GetProfile } from '../../pages/Profile/api/Profile';
import { CODE_DELETED } from '../../shared/Consts/Codes';

export interface ProfileState {
    user: ProfileType | undefined;
    isFetched: boolean;
    isHiddenDeleteReview: boolean;
    deleteReviewId: string;
}

const initialState: ProfileState = {
    user: undefined,
    isFetched: false,
    isHiddenDeleteReview: true,
    deleteReviewId: '',
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
            });
    },
});

export const { hideDeleteReviewModal, setIsHiddenDeleteReview, clearProfile } =
    profileSlice.actions;

export default profileSlice.reducer;
