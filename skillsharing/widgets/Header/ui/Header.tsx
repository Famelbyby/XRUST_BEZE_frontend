import React from "react";
import './Header.scss'

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header-logo">
                SkillSharing
            </div>
            <div className="header-searchbar">
                <img className="header-searchbar__img" src="/Header/search.png" alt=""/>
                <input type="text" placeholder="Поиск" className="header-searchbar__input" />
            </div>
            <div className="header-profile">
                <img className="header-profile__avatar" src="/shared/avatar.png" alt="profile" />
                <img className="header-profile__notifications" src="/Header/bell.png" alt="notifications"/>
            </div>
        </div>
    )
};

export default Header;