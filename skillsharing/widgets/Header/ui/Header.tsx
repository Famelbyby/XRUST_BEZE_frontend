import React from "react";
import './Header.scss'
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { AppState } from "../../../app/AppStore";
import { AVATAR_URL } from "../../../shared/Consts/URLS";

const Header: React.FC = () => {
    const {user} = useSelector((state: AppState) => state.user);

    return (
        <div className={"header" + (user === undefined ? " header_none-user" : "")}>
            <Link to={'/main-page'} >
                <div className="header-logo">
                    SkillSharing
                </div>
            </Link>
            {user !== undefined && 
                <>
                    {/* <div className="header-searchbar">
                        <img className="header-searchbar__img" src="/Header/search.png" alt=""/>
                        <input type="text" placeholder="Поиск" className="header-searchbar__input" />
                    </div> */}
                    <div className="header-profile">
                        <Link to={`/profile/${user.id}`} >
                            <img className="header-profile__avatar" src={AVATAR_URL + user.avatar} alt="profile" />
                        </Link>
                        {/* <img className="header-profile__notifications" src="/Header/bell.png" alt="notifications"/> */}
                    </div>
                </>
            }
        </div>
    )
};

export default Header;