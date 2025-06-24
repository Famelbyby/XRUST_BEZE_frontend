import React from 'react';
import { Link } from 'react-router';
import { FormatRelativeTimeInPastInDays } from '../../../shared/Functions/FormatDate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../app/AppStore';
import './ProfileHeader.scss';
import { ProfileType } from '../../../pages/Profile/ui/ProfileTypes';
import { Logout } from '../../../entity/User/api/User';

const ProfileHeader: React.FC = () => {
    const { user, theme } = useSelector((state: AppState) => state.user);
    const { user: profile } = useSelector((state: AppState) => state.profile);
    const ownUserID: ProfileType['id'] | undefined = user?.id;
    const lastSeen: Date | undefined =
        profile === undefined ? undefined : new Date(profile.last_active_at);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="profile-header">
            <div className="profile-brief">
                <div className="profile-brief__name">
                    {profile === undefined && (
                        <div className="profile-brief__name-mock">
                            <div className="profile-brief__name-spinner"></div>
                        </div>
                    )}
                    {profile !== undefined && profile.username}
                </div>
                <div className={'profile-brief-last-seen' + ` ${theme}-mode__bright-text`}>
                    <img
                        className={'profile-brief-last-seen__img' + ` ${theme}-mode__img`}
                        src="/shared/clock.png"
                        alt=""
                    />
                    {profile !== undefined && <>{FormatRelativeTimeInPastInDays(lastSeen!)}</>}
                    {profile === undefined && <>давно-давно...</>}
                </div>
            </div>
            {profile !== undefined && ownUserID === profile.id && (
                <div className="profile-buttons">
                    <Link to={'/settings'}>
                        <div className="profile-buttons-edit">
                            <img
                                className={
                                    'profile-buttons-edit__img' +
                                    (theme === 'light' ? '' : ` ${theme}-mode__img`)
                                }
                                src="/shared/pen.png"
                                alt=""
                            />
                            Изменить
                        </div>
                    </Link>
                    <div
                        className={
                            'profile-buttons-exit' +
                            (theme === 'light' ? '' : ` ${theme}-mode__bright-block`)
                        }
                        onClick={() => {
                            dispatch(Logout());
                        }}
                    >
                        <img
                            className="profile-buttons-exit__img"
                            src="/ProfilePage/exit.png"
                            alt=""
                        />
                        Выйти
                    </div>
                </div>
            )}
            {profile !== undefined && ownUserID !== profile.id && (
                <div className="profile-buttons profile-buttons_other">
                    {/* <div className="profile-buttons-report">
                        <img
                            className={
                                'profile-buttons-report__img' +
                                (theme === 'light' ? '' : ` ${theme}-mode__img`)
                            }
                            src="/ProfilePage/report.png"
                            alt=""
                        />
                        Пожаловаться
                    </div> */}
                    <Link to={`/chat/${profile.id}`}>
                        <div
                            className={
                                'profile-buttons-chat' +
                                (theme === 'light' ? '' : ` ${theme}-mode__bright-block`)
                            }
                        >
                            <img
                                className="profile-buttons-chat__img"
                                src="/ProfilePage/chat2.png"
                                alt=""
                            />
                            Написать
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProfileHeader;
