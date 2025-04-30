import React from 'react';
import './Header.scss';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/AppStore';
import { AVATAR_URL } from '../../../shared/Consts/URLS';

const Header: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.user);

    return (
        <div className={'header' + (user === undefined ? ' header_none-user' : '')}>
            <Link to={'/main-page'} aria-label="Главная">
                <div className="header-logo">SkillSharing</div>
            </Link>
            {user !== undefined && (
                <>
                    <div className="header-profile">
                        <Link to={`/profile/${user.id}`} aria-label="Профиль">
                            <img
                                className="header-profile__avatar"
                                src={AVATAR_URL + user.avatar}
                                alt="profile"
                            />
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Header;
