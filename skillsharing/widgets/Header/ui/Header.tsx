import React from "react";
import './Header.scss'
import { Link } from "react-router";
import User from "../../../entity/User/User";

const Header: React.FC = () => {
    return (
        <div className="header">
            <Link to={'/'} >
                <div className="header-logo">
                    SkillSharing
                </div>
            </Link>
            <div className="header-searchbar">
                <img className="header-searchbar__img" src="/Header/search.png" alt=""/>
                <input type="text" placeholder="Поиск" className="header-searchbar__input" />
            </div>
            <div className="header-profile">
                <Link to={`/profile/${User.getUserID()}`} >
                    <img className="header-profile__avatar" src="/shared/avatar.png" alt="profile" />
                </Link>
                <img className="header-profile__notifications" src="/Header/bell.png" alt="notifications"/>
            </div>
        </div>
    )
};

export default Header;