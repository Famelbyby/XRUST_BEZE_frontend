import React from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import './ProfileRightColumn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import { Link } from 'react-router';
import Review from '../../entity/Review/Review';
import { createPortal } from 'react-dom';
import ModalWindow from '../../features/ModalWindow/ModalWindow';
import { hideDeleteReviewModal } from '../../app/slices/ProfileSlice';
import { DeleteReview } from '../../pages/Profile/api/Profile';
import ProfileAddReview from '../../features/ProfileAddReview/ProfileAddReview';

const ProfileRightColumn: React.FC = () => {
    const { user, isHiddenDeleteReview, deleteReviewId } = useSelector(
        (state: AppState) => state.profile,
    );
    const { user: myUser } = useSelector((state: AppState) => state.user);
    const alreadyHaveReview =
        myUser !== undefined &&
        user !== undefined &&
        ((user.reviews || []).find((review) => review.user_id_by === myUser.id) ||
            user.id === myUser.id);
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
