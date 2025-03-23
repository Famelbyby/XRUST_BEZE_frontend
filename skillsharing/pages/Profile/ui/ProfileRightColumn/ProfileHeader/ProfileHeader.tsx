import React from "react";
import { Link } from "react-router";
import { ProfileType } from "../../ProfileTypes";

interface ProfileHeaderPropTypes {
    user: ProfileType | undefined,
}

const ProfileHeader: React.FC<ProfileHeaderPropTypes> = ({user}) => {
    const ownUserID = 2;

    return (
        <div className="profile-header">
            <div className="profile-brief">
                <div className="profile-brief__name">
                    {user === undefined && 
                        <div className="profile-brief__name-mock">
                            <div className="profile-brief__name-spinner">
                            </div>
                        </div>
                    }
                    {user !== undefined && user.name}
                </div>
                <div className="profile-brief-last-seen">
                    <img className="profile-brief-last-seen__img" src="/Profile/clock.png" alt="" />
                    {user !== undefined && user.lastSeen}
                </div>
            </div>
            { user !== undefined && ownUserID === user.id && 
                <div className="profile-buttons">
                    <Link to={"/settings"}>
                        <div className="profile-buttons-edit">
                            <img className="profile-buttons-edit__img" src="/shared/pen.png" alt="" />
                            Изменить
                        </div>
                    </Link>
                    <div className="profile-buttons-exit">
                        <img className="profile-buttons-exit__img" src="/Profile/exit.png" alt="" />
                        Выйти
                    </div>
                </div>
            }
            { user !== undefined && ownUserID !== user.id && 
                <div className="profile-buttons profile-buttons_other">
                        <div className="profile-buttons-report">
                            <img className="profile-buttons-report__img" src="/Profile/report.png" alt="" />
                            Пожаловаться
                        </div>
                    <Link to={`/chat/${user.id}`}>
                        <div className="profile-buttons-chat">
                            <img className="profile-buttons-chat__img" src="/Profile/chat.png" alt="" />
                            Написать
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
};

export default ProfileHeader;