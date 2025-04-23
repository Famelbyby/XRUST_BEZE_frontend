import React from "react";
import ProfileHeader from './ProfileHeader/ProfileHeader'
import './ProfileRightColumn.scss'
import { useSelector } from "react-redux";
import { AppState } from "../../app/AppStore";
import { Link } from "react-router";

// const hrefs: string[] = [
//     "https://github.com",
//     "https://vk.com",
//     "https://twitch.com",
// ];

const ProfileRightColumn: React.FC = () => {
    const {user} = useSelector((state: AppState) => state.profile);

    return (
        <div className="profile-right-column">
            <ProfileHeader profile={user}/>
            <div className="profile-content">
                <div className="profile-description">
                    О себе
                    <div className="profile-description__field">
                        {user === undefined && 
                            <div className="profile-description__field-mock">
                                <div className="profile-description__field-spinner">
                                </div>
                            </div>
                        }
                        {user !== undefined && user.bio}
                    </div>
                </div>
                {user !== undefined &&
                    <div className="profile-hrefs">
                        Ссылки
                        {user.hrefs && user.hrefs.length > 0 && 
                            <div className="profile-hrefs-examples">
                                {user.hrefs.map((href: string, index: number) => {
                                    const isMatched = !!href.match(/http(s)*:\/\/(.)+\.(.)+/);

                                    return (
                                        <div key={index} className="profile-hrefs-examples-item">
                                            {isMatched && 
                                                <a href={href} target="_blank" className="profile-hrefs-examples__href">
                                                    {href}
                                                </a>
                                            }
                                            {!isMatched && 
                                                <>
                                                    {href}
                                                </>
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        }
                        {((user.hrefs === null) || (user.hrefs && user.hrefs.length === 0)) && 
                            <div className="profile-hrefs__no-hrefs">
                                Тут пусто
                            </div>
                        }
                    </div>   
                }
                <div className="profile-materials">
                    Учебные материалы
                    <Link to={`/profile-materials/${user?.id}`}>
                        <div className="profile-materials-go-page">
                            <img className="profile-materials-go-page__img" src="/shared/go-back.png" alt="Перейти к учебным материалам"/>
                        </div>
                    </Link>
                </div>
                {/*<div className="profile-feedbacks">
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
                </div> */}
            </div>
        </div>
    )
};

export default ProfileRightColumn;