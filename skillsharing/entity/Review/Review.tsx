import React, { useState } from 'react';
import ReviewType from './ReviewTypes';
import { Link } from 'react-router';
import { AVATAR_URL } from '../../shared/Consts/URLS';
import { FormatRelativeTimeInPastInDays } from '../../shared/Functions/FormatDate';
import { SECOND_IN_MILLISECONDS } from '../../shared/Consts/ValidatorsConts';
import SkillsLine from '../../features/SkillsLine/SkillsLine';
import './Review.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import {
    cancelUpdatingReview,
    setIsHiddenDeleteReview,
    setUpdatingReviewId,
} from '../../app/slices/ProfileSlice';
import { NormalizeTextarea } from '../../shared/Functions/FormatComponents';
import { UpdateReview } from '../../pages/Profile/api/Profile';

interface ReviewPropTypes {
    review: ReviewType;
}

const TEXTAREA_INITIAL_HEIGHT = 23;
const TEXTAREA_ID = 'textarea';

const Review: React.FC<ReviewPropTypes> = ({ review }) => {
    const { user, theme } = useSelector((state: AppState) => state.user);
    const { updatingReviewId } = useSelector((state: AppState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();
    const [rating, setRating] = useState(1);
    const [textareaInput, setTextareaInput] = useState('');

    function handleChangingTextareaInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();

        const textAreaInput: HTMLTextAreaElement = event.target;

        if (textAreaInput.value.length === 300) {
            return;
        }

        NormalizeTextarea(TEXTAREA_ID, TEXTAREA_INITIAL_HEIGHT);
        setTextareaInput(textAreaInput.value);
    }

    return (
        <div className="review">
            <Link to={`/profile/${review.user_id_by}`}>
                <img
                    className="review-user__avatar"
                    src={AVATAR_URL + review.user_by.avatar}
                    alt=""
                />
            </Link>
            <div className="review-content">
                <div className="review-header">
                    <div className="review-user-info">
                        <Link to={`/profile/${review.user_id_by}`}>
                            <div className="review-user-info__name">{review.user_by.username}</div>
                        </Link>
                        {review.id === updatingReviewId && (
                            <div className="profile-add-review-rating">
                                {[1, 2, 3, 4, 5].map((rate) => {
                                    const ifYellowStar = rate <= rating;

                                    return (
                                        <img
                                            key={rate}
                                            className={
                                                'profile-add-review-rating__img' +
                                                (!ifYellowStar ? ` ${theme}-mode__img` : '')
                                            }
                                            src={
                                                '/ProfilePage/star' +
                                                (ifYellowStar ? '_yellow' : '') +
                                                '.png'
                                            }
                                            alt=""
                                            onClick={() => setRating(rate)}
                                        />
                                    );
                                })}
                                {rating}
                            </div>
                        )}
                        {review.id !== updatingReviewId && (
                            <div className="review-rating">
                                <img
                                    className="review-rating__img"
                                    src="/ProfilePage/star_yellow.png"
                                    alt="Рейтинг"
                                />
                                {review.rating}
                            </div>
                        )}
                    </div>
                    <div className="review-info__tags">
                        <SkillsLine skills={review.user_by.skills_to_share} />
                    </div>
                </div>
                <div className="review-footer">
                    <div className="review-info">
                        {review.id === updatingReviewId && (
                            <textarea
                                id="textarea"
                                className={
                                    'profile-add-review-user-info__input' +
                                    ` ${theme}-mode__bright-text`
                                }
                                value={textareaInput}
                                onChange={(event) => handleChangingTextareaInput(event)}
                                placeholder="Ваш комментарий..."
                            ></textarea>
                        )}
                        {review.id !== updatingReviewId && (
                            <div className={'review-user-info__text'}>{review.text}</div>
                        )}
                        <div className={'review-user-info__time' + `${theme}-mode__bright-text`}>
                            {FormatRelativeTimeInPastInDays(
                                new Date(review.created * SECOND_IN_MILLISECONDS),
                            )}
                        </div>
                    </div>
                    {user !== undefined &&
                        user.id === review.user_id_by &&
                        updatingReviewId !== review.id && (
                            <div className="review-manage">
                                <img
                                    className={'review-manage__edit' + ` ${theme}-mode__img`}
                                    src="/shared/pen.png"
                                    alt="Изменить"
                                    onClick={() => {
                                        dispatch(setUpdatingReviewId(review.id));
                                        setRating(review.rating);
                                        setTextareaInput(review.text);
                                    }}
                                />
                                <img
                                    className={'review-manage__delete' + ` ${theme}-mode__img`}
                                    src="/shared/delete.png"
                                    alt="Удалить"
                                    onClick={() => {
                                        dispatch(
                                            setIsHiddenDeleteReview({ id: review.id, bool: false }),
                                        );
                                    }}
                                />
                            </div>
                        )}
                    {review.id === updatingReviewId && (
                        <div className="review-manage">
                            <img
                                className={
                                    'profile-add-review-footer__cancel-update-review' +
                                    ` ${theme}-mode__img`
                                }
                                src="/shared/cancel.png"
                                alt="Отменить обновление"
                                onClick={() => {
                                    dispatch(cancelUpdatingReview());
                                }}
                            />
                            <img
                                className="profile-add-review-footer__send-review"
                                src="/shared/send.png"
                                alt="Обновить комментарий"
                                onClick={() => {
                                    dispatch(
                                        UpdateReview({
                                            text: textareaInput,
                                            rating,
                                            reviewId: review.id,
                                        }),
                                    );
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Review;
