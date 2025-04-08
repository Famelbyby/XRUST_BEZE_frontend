import React from "react";
import { Link } from "react-router";
import { ProfileType } from "../../../pages/Profile/ui/ProfileTypes";
import { FormatRelativeTimeInPastInDays } from "../../../shared/Functions/FormatDate";
import { useSelector } from "react-redux";
import { AppState } from "../../../app/AppStore";
import './ProfileHeader.scss'

interface ProfileHeaderPropTypes {
    profile: ProfileType | undefined,
}

const ProfileHeader: React.FC<ProfileHeaderPropTypes> = ({profile}) => {
    const {user} = useSelector((state: AppState) => state.user);
    const ownUserID: ProfileType["id"] | undefined = user?.id;
    const lastSeen: Date | undefined = (profile === undefined ? undefined : new Date(profile.last_active_at));

    return (
        <div className="profile-header">
            <div className="profile-brief">
                <div className="profile-brief__name">
                    {profile === undefined && 
                        <div className="profile-brief__name-mock">
                            <div className="profile-brief__name-spinner">
                            </div>
                        </div>
                    }
                    {profile !== undefined && profile.username}
                </div>
                <div className="profile-brief-last-seen">
                    <img className="profile-brief-last-seen__img" src="/shared/clock.png" alt="" />
                    {profile !== undefined && 
                        <>
                            {FormatRelativeTimeInPastInDays(lastSeen!)}
                        </>
                    }
                    {profile === undefined && 
                        <>
                            давно-давно...
                        </>
                    }
                </div>
            </div>
            { profile !== undefined && ownUserID === profile.id && 
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
            { profile !== undefined && ownUserID !== profile.id && 
                <div className="profile-buttons profile-buttons_other">
                        <div className="profile-buttons-report">
                            <img className="profile-buttons-report__img" src="/Profile/report.png" alt="" />
                            Пожаловаться
                        </div>
                    <Link to={`/chat/${profile.id}`}>
                        <div className="profile-buttons-chat">
                            <img className="profile-buttons-chat__img" src="/Profile/chat2.png" alt="" />
                            Написать
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
};

export default ProfileHeader;