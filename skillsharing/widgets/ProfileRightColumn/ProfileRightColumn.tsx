import React, { useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import './ProfileRightColumn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import { Link } from 'react-router';
import Review from '../../entity/Review/Review';
import { createPortal } from 'react-dom';
import ModalWindow from '../../features/ModalWindow/ModalWindow';
import { hideDeleteReviewModal } from '../../app/slices/ProfileSlice';
import { AddReview, DeleteReview } from '../../pages/Profile/api/Profile';
import { AVATAR_URL } from '../../shared/Consts/URLS';
import SkillsLine from '../../features/SkillsLine/SkillsLine';
import { NormalizeTextarea } from '../../shared/Functions/FormatComponents';

const TEXTAREA_INITIAL_HEIGHT = 23;
const TEXTAREA_ID = 'textarea';

const ProfileAddReview: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.user);
    const { user: profile } = useSelector((state: AppState) => state.profile);
    const [textareaInput, setTextareaInput] = useState('');
    const [rating, setRating] = useState(1);
    const dispatch = useDispatch<AppDispatch>();

    function handleChangingTextareaInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();

        const textAreaInput: HTMLTextAreaElement = event.target;

        if (textAreaInput.value.length === 300) {
            return;
        }

        NormalizeTextarea(TEXTAREA_ID, TEXTAREA_INITIAL_HEIGHT);
        setTextareaInput(textAreaInput.value);
    }

    useEffect(() => {
        NormalizeTextarea(TEXTAREA_ID, TEXTAREA_INITIAL_HEIGHT);
    }, []);

    return (
        <>
            {user !== undefined && profile !== undefined && (
                <div className="profile-add-review">
                    <img
                        className="profile-add-review-user__avatar"
                        src={AVATAR_URL + user.avatar}
                        alt=""
                    />
                    <div className="profile-add-review-content">
                        <div className="profile-add-review-header">
                            <div className="profile-add-review-user-info">
                                <div className="profile-add-review-user-info__name">
                                    {user.username}
                                </div>
                                <div className="profile-add-review-rating">
                                    {[1, 2, 3, 4, 5].map((rate) => {
                                        return (
                                            <img
                                                key={rate}
                                                className="profile-add-review-rating__img"
                                                src={
                                                    '/ProfilePage/star' +
                                                    (rate <= rating ? '_yellow' : '') +
                                                    '.png'
                                                }
                                                alt=""
                                                onClick={() => setRating(rate)}
                                            />
                                        );
                                    })}
                                    {rating}
                                </div>
                            </div>
                            <div className="profile-add-review-info__tags">
                                <SkillsLine skills={user.skills_to_share} />
                            </div>
                        </div>
                        <div className="profile-add-review-footer">
                            <div className="profile-add-review-info">
                                <textarea
                                    id="textarea"
                                    className={'profile-add-review-user-info__input'}
                                    value={textareaInput}
                                    onChange={(event) => handleChangingTextareaInput(event)}
                                    placeholder="Ваш комментарий..."
                                ></textarea>
                            </div>
                            <img
                                className="profile-add-review-footer__send-review"
                                src="/shared/send.png"
                                alt="Отправить комментарий"
                                onClick={() => {
                                    dispatch(
                                        AddReview({
                                            text: textareaInput,
                                            rating,
                                            user_id_by: user.id,
                                            user_id_to: profile.id,
                                        }),
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const ProfileRightColumn: React.FC = () => {
    const { user, isHiddenDeleteReview, deleteReviewId } = useSelector(
        (state: AppState) => state.profile,
    );
    const { user: myUser } = useSelector((state: AppState) => state.user);
    const alreadyHaveReview =
        myUser !== undefined &&
        user !== undefined &&
        (user.reviews || []).find((review) => review.user_id_by === myUser.id);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="profile-right-column">
            <ProfileHeader />
            <div className="profile-content">
                <div className="profile-description">
                    О себе
                    <div className="profile-description__field">
                        {user === undefined && (
                            <div className="profile-description__field-mock">
                                <div className="profile-description__field-spinner"></div>
                            </div>
                        )}
                        {user !== undefined && (user.bio || '*стрекот сверчков*')}
                    </div>
                </div>
                {user !== undefined && (
                    <div className="profile-hrefs">
                        Ссылки
                        {user.hrefs && user.hrefs.length > 0 && (
                            <div className="profile-hrefs-examples">
                                {user.hrefs.map((href: string, index: number) => {
                                    const isMatched = !!href.match(/http(s)*:\/\/(.)+\.(.)+/);

                                    return (
                                        <div key={index} className="profile-hrefs-examples-item">
                                            {isMatched && (
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    className="profile-hrefs-examples__href"
                                                    aria-label={`Ссылка на ${href}`}
                                                >
                                                    {href}
                                                </a>
                                            )}
                                            {!isMatched && <>{href}</>}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {(user.hrefs === null || (user.hrefs && user.hrefs.length === 0)) && (
                            <div className="profile-hrefs__no-hrefs">Тут пусто</div>
                        )}
                    </div>
                )}
                <div className="profile-materials">
                    Учебные материалы
                    <Link
                        to={`/profile-materials/${user?.id}`}
                        aria-label="Перейти к учебным материалам"
                    >
                        <div className="profile-materials-go-page">
                            <img
                                className="profile-materials-go-page__img"
                                src="/shared/go-back.png"
                                alt=""
                            />
                        </div>
                    </Link>
                </div>
                <div className="profile-reviews">
                    Отзывы
                    {!alreadyHaveReview && <ProfileAddReview />}
                    {user !== undefined &&
                        (user.reviews === undefined || user.reviews.length === 0) && (
                            <div className="profile-reviews__no-reviews">Отзывов нет</div>
                        )}
                    {user !== undefined && user.reviews !== undefined && (
                        <>
                            {user.reviews.map((review) => {
                                return <Review key={review.id} review={review} />;
                            })}
                        </>
                    )}
                </div>
            </div>
            {!isHiddenDeleteReview &&
                createPortal(
                    <ModalWindow
                        modalType={'delete'}
                        closeModal={() => dispatch(hideDeleteReviewModal())}
                        agreeTitle="Да"
                        cancelTitle="Отменить"
                        agreeFunc={() => dispatch(DeleteReview(deleteReviewId))}
                        windowTitle="Вы уверены, что хотите удалить отзыв?"
                    />,
                    document.querySelector('#root')!,
                )}
        </div>
    );
};

export default ProfileRightColumn;
