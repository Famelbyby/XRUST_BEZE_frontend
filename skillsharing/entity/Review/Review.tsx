import React from 'react';
import ReviewType from './ReviewTypes';
import { Link } from 'react-router';
import { AVATAR_URL } from '../../shared/Consts/URLS';
import { FormatRelativeTimeInPastInDays } from '../../shared/Functions/FormatDate';
import { SECOND_IN_MILLISECONDS } from '../../shared/Consts/ValidatorsConts';
import SkillsLine from '../../features/SkillsLine/SkillsLine';
import './Review.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import { setIsHiddenDeleteReview } from '../../app/slices/ProfileSlice';

interface ReviewPropTypes {
    review: ReviewType;
}

const Review: React.FC<ReviewPropTypes> = ({ review }) => {
    const { user } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

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
                        <div className="review-rating">
                            <img
                                className="review-rating__img"
                                src="/ProfilePage/star_yellow.png"
                                alt="Рейтинг"
                            />
                            {review.rating}
                        </div>
                    </div>
                    <div className="review-info__tags">
                        <SkillsLine skills={review.user_by.skills_to_share} />
                    </div>
                </div>
                <div className="review-footer">
                    <div className="review-info">
                        <span className={'review-user-info__text'}>{review.text}</span>
                        <div className="review-user-info__time">
                            {FormatRelativeTimeInPastInDays(
                                new Date(review.created * SECOND_IN_MILLISECONDS),
                            )}
                        </div>
                    </div>
                    {user !== undefined && user.id === review.user_id_by && (
                        <div className="review-manage">
                            <img
                                className="review-manage__edit"
                                src="/shared/pen.png"
                                alt="Изменить"
                            />
                            <img
                                className="review-manage__delete"
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
                </div>
            </div>
        </div>
    );
};

export default Review;
