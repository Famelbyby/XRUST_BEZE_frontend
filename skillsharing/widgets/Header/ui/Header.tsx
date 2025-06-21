import React from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/AppStore';
import { AVATAR_URL, LOG_IN_URL, SIGN_UP_URL } from '../../../shared/Consts/URLS';

const Header: React.FC = () => {
    const { user, theme } = useSelector((state: AppState) => state.user);
    const location = useLocation();

    return (
        <div
            className={
                'header' +
                (theme === 'light' ? '' : ` ${theme}-mode__block`) +
                (user === undefined ? ' header_none-user' : '')
            }
        >
            <Link
                to={'/'}
                className={
                    'header-main-link' + (theme === 'light' ? '' : ` ${theme}-mode__dull-text`)
                }
                aria-label="Главная"
            >
                SkillSharing
            </Link>
            {user !== undefined && (
                <div className={'header-profile'}>
                    <Link
                        to={`/profile/${user.id}`}
                        aria-label="Профиль"
                        className="header-profile-href"
                    >
                        <div
                            className={
                                'header-profile__name' +
                                (theme === 'light' ? '' : ` ${theme}-mode__dull-text`)
                            }
                        >
                            {user.username}
                        </div>
                        <img
                            className="header-profile__avatar"
                            src={AVATAR_URL + user.avatar}
                            alt="profile"
                        />
                    </Link>
                </div>
            )}
            {user === undefined && ![SIGN_UP_URL, LOG_IN_URL].includes(location.pathname) && (
                <div className="header-auth-buttons">
                    <Link to={LOG_IN_URL}>
                        <div
                            className={
                                'header-auth-buttons__log-in' +
                                (theme === 'light' ? '' : ` ${theme}-mode__dull-text`)
                            }
                        >
                            Вход
                        </div>
                    </Link>
                    <Link to={SIGN_UP_URL}>
                        <div
                            className={
                                'header-auth-buttons__sign-up' +
                                (theme === 'light' ? '' : ` ${theme}-mode__dull-text`)
                            }
                        >
                            Регистрация
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
