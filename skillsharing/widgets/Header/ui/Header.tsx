import React from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/AppStore';
import { AVATAR_URL, LOG_IN_URL, SIGN_UP_URL } from '../../../shared/Consts/URLS';

const Header: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.user);
    const location = useLocation();

    return (
        <div className={'header' + (user === undefined ? ' header_none-user' : '')}>
            <Link
                to={user === undefined ? '/' : '/main-page'}
                className="header-main-link"
                aria-label="Главная"
            >
                <img className="header-logo" src="/shared/skillsharing_logo2.png" alt="Главная" />
                SkillSharing
            </Link>
            {user !== undefined && (
                <div className="header-profile">
                    <Link to={`/profile/${user.id}`} aria-label="Профиль">
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
                        <div className="header-auth-buttons__log-in">Вход</div>
                    </Link>
                    <Link to={SIGN_UP_URL}>
                        <div className="header-auth-buttons__sign-up">Регистрация</div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
