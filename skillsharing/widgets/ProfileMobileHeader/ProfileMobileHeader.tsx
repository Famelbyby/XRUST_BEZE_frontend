import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import { AVATAR_URL } from '../../shared/Consts/URLS';
import './ProfileMobileHeader.scss';
import { FormatRelativeTimeInPastInDays } from '../../shared/Functions/FormatDate';
import { Link } from 'react-router';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import { Logout } from '../../entity/User/api/User';

const ProfileMobileHeader: React.FC = () => {
    const { user: profile } = useSelector((state: AppState) => state.profile);
    const { user } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const ownUserID: ProfileType['id'] | undefined = user?.id;

    return (
        <div className="profile-mobile-header">
            <div className="profile-mobile-header-info">
                <div className="profile-mobile-header-user">
                    <img
                        className="profile-mobile-header-info__avatar"
                        src={AVATAR_URL + profile?.avatar}
                        alt="Аватар"
                    />
                    <div className="profile-mobile-header-info-user">
                        <div className="profile-mobile-header__name">{profile?.username}</div>
                        <div className="profile-mobile-header-last-seen">
                            <img
                                className="profile-mobile-header-last-seen__img"
                                src="/shared/clock.png"
                                alt="В сети"
                            />
                            <div className="profile-mobile-header-last-seen__title">
                                {profile !== undefined && (
                                    <>
                                        {FormatRelativeTimeInPastInDays(
                                            new Date(profile.last_active_at),
                                        )}
                                    </>
                                )}
                                {profile === undefined && <>давно-давно...</>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-mobile-header-rating">
                    <img
                        className="profile-mobile-header-rating__img"
                        src="/ProfilePage/star.png"
                        alt="Оценка"
                    />
                    <div className="profile-mobile-header-rating__title">{0}</div>
                </div>
            </div>
            {profile !== undefined && ownUserID === profile.id && (
                <div className="profile-buttons">
                    <Link to={'/settings'}>
                        <img className="profile-mobile-header__edit" src="/shared/pen.png" alt="" />
                    </Link>
                    <div
                        className="profile-mobile-header-logout-wrapper"
                        onClick={() => {
                            dispatch(Logout());
                        }}
                    >
                        <img
                            className="profile-mobile-header__logout"
                            src="/ProfilePage/exit.png"
                            alt=""
                        />
                    </div>
                </div>
            )}
            {profile !== undefined && ownUserID !== profile.id && (
                <div className="profile-mobile-header-buttons">
                    <img
                        className="profile-mobile-header__report"
                        src="/ProfilePage/report.png"
                        alt="Пожаловаться"
                    />
                    <Link to={`/chat/${profile.id}`}>
                        <div
                            className="profile-mobile-header-logout-wrapper"
                            onClick={() => {
                                dispatch(Logout());
                            }}
                        >
                            <img
                                className="profile-mobile-header__send-message"
                                src="/ProfilePage/chat2.png"
                                alt=""
                            />
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProfileMobileHeader;
