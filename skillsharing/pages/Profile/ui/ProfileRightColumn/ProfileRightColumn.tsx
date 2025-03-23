import React from "react";
import ProfileHeader from './ProfileHeader/ProfileHeader'
import { ProfileType } from "../ProfileTypes";

interface ProfileRightColumnPropTypes {
    profile: ProfileType | undefined,
}

const ProfileRightColumn: React.FC<ProfileRightColumnPropTypes> = ({profile}) => {
    return (
        <div className="profile-right-column">
            <ProfileHeader user={profile}/>
            <div className="profile-content">
                <div className="profile-description">
                    О себе
                    <div className="profile-description__field">
                        {profile === undefined && 
                            <div className="profile-description__field-mock">
                                <div className="profile-description__field-spinner">
                                </div>
                            </div>
                        }
                        {profile !== undefined && profile.description}
                    </div>
                </div>
                {profile && profile.hrefs.length > 0 &&
                    <div className="profile-hrefs">
                        Ссылки
                        <div className="profile-hrefs-examples">
                            {profile.hrefs.map((href: string, index: number) => {
                                return (
                                    <div key={index} className="profile-hrefs-examples__href">
                                        <a href={href} target="_blank">
                                            {href}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>   
                }
                <div className="profile-feedbacks">
                    Отзывы
                    {profile !== undefined && profile.feedbacks.length > 0 &&
                        profile.feedbacks.map((_, index: number) => {
                            return (
                                <div key={index}>
                                </div>
                            )
                        })
                    }
                    {profile === undefined || profile.feedbacks.length === 0 && 
                        <div className="profile-feedbacks__no-feedbacks">
                            Отзывов нет
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default ProfileRightColumn;