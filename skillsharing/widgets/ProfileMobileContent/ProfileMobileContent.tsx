import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import './ProfileMobileContent.scss';
import { Link } from 'react-router';
import { CommunicationFormat, Skill } from '../../shared/Consts/Interfaces';
import { CapitalizeString } from '../../shared/Functions/FormatStrings';
import { PREFERRED_FORMAT_TRANSLATION } from '../../shared/Consts/Translations';
import { hideDeleteReviewModal } from '../../app/slices/ProfileSlice';
import { DeleteReview } from '../../pages/Profile/api/Profile';
import { createPortal } from 'react-dom';
import ModalWindow from '../../features/ModalWindow/ModalWindow';
import ProfileAddReview from '../../features/ProfileAddReview/ProfileAddReview';
import Review from '../../entity/Review/Review';

const ProfileMobileContent: React.FC = () => {
    const {
        user: profile,
        isHiddenDeleteReview,
        deleteReviewId,
    } = useSelector((state: AppState) => state.profile);
    const { user: myUser } = useSelector((state: AppState) => state.user);
    const alreadyHaveReview =
        myUser !== undefined &&
        profile !== undefined &&
        ((profile.reviews || []).find((review) => review.user_id_by === myUser.id) ||
            profile.id === myUser.id);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="profile-mobile-content">
            <div className="profile-mobile-content-description">
                О себе
                <div className="profile-mobile-content-description__field">
                    {profile === undefined && (
                        <div className="profile-mobile-content-description__field-mock">
                            <div className="profile-mobile-content-description__field-spinner"></div>
                        </div>
                    )}
                    {profile !== undefined && (profile.bio || '*стрекот сверчков*')}
                </div>
            </div>
            {profile !== undefined && (
                <div className="profile-mobile-content-hrefs">
                    Ссылки
                    {profile.hrefs && profile.hrefs.length > 0 && (
                        <div className="profile-mobile-content-hrefs-examples">
                            {profile.hrefs.map((href: string, index: number) => {
                                const isMatched = !!href.match(/http(s)*:\/\/(.)+\.(.)+/);

                                return (
                                    <div
                                        key={index}
                                        className="profile-mobile-content-hrefs-examples-item"
                                    >
                                        {isMatched && (
                                            <a
                                                href={href}
                                                target="_blank"
                                                className="profile-mobile-content-hrefs-examples__href"
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
                    {(profile.hrefs === null || (profile.hrefs && profile.hrefs.length === 0)) && (
                        <div className="profile-mobile-content-hrefs__no-hrefs">Тут пусто</div>
                    )}
                </div>
            )}
            <div className="profile-mobile-content-tags">
                <div className="profile-mobile-content-to-share">
                    <div className="profile-mobile-content-tags-header">
                        <div className="profile-mobile-content-tags-header__title">
                            Навыки
                            <img
                                className="profile-mobile-content-tags-header__img"
                                title="Пользователь делится следующими навыками"
                                src="/shared/question.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="profile-mobile-content-tags-array">
                        {profile !== undefined &&
                            profile.skills_to_share.map((skill: Skill) => {
                                return (
                                    <div
                                        className={`profile-mobile-content-tags-array__tag profile-mobile-content-tags-array__tag_${skill.level}`}
                                        title={`${CapitalizeString(skill.level)}`}
                                        key={skill.name}
                                    >
                                        {skill.name}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {myUser?.id === profile?.id && (
                    <div className="profile-mobile-content-to-learn">
                        <div className="profile-mobile-content-to-learn-header">
                            <div className="profile-mobile-content-to-learn-header__title">
                                Я хочу изучить
                            </div>
                        </div>
                        <div className="profile-mobile-content-to-learn-array">
                            {profile !== undefined &&
                                profile.skills_to_learn.map((skill: Skill) => {
                                    return (
                                        <div
                                            className={`profile-mobile-content-to-learn-array__tag profile-mobile-content-to-learn-array__tag_${skill.level}`}
                                            title={`${CapitalizeString(skill.level)}`}
                                            key={skill.name}
                                        >
                                            {skill.name}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>
            {profile !== undefined && (
                <div className="profile-preferred-format">
                    Предпочитает общаться
                    <div className="profile-preferred-format__example">
                        {
                            PREFERRED_FORMAT_TRANSLATION[
                                profile.preferred_format as CommunicationFormat
                            ]
                        }
                    </div>
                </div>
            )}
            <div className="profile-mobile-content-materials">
                Учебные материалы
                <Link
                    to={`/profile-materials/${profile?.id}`}
                    aria-label="Перейти к учебным материалам"
                >
                    <div className="profile-mobile-content-materials-go-page">
                        <img
                            className="profile-mobile-content-materials-go-page__img"
                            src="/shared/go-back.png"
                            alt=""
                        />
                    </div>
                </Link>
            </div>
            <div className="profile-mobile-content-reviews">
                Отзывы
                {!alreadyHaveReview && <ProfileAddReview />}
                {profile !== undefined &&
                    (profile.reviews === undefined || profile.reviews.length === 0) && (
                        <div className="profile-mobile-content-reviews__no-reviews">
                            Отзывов нет
                        </div>
                    )}
                {profile !== undefined && profile.reviews !== undefined && (
                    <>
                        {profile.reviews.map((review) => {
                            return <Review key={review.id} review={review} />;
                        })}
                    </>
                )}
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

export default ProfileMobileContent;
