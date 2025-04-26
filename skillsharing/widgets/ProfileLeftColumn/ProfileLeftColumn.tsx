import React, { useEffect } from "react";
import { StatisticItem} from './ProfileLeftColumnTypes'
import {CapitalizeString} from '../../shared/Functions/FormatStrings'
import {PREFERRED_FORMAT_TRANSLATION} from '../../shared/Consts/Translations'
import './ProfileLeftColumn.scss'
import { CommunicationFormat, Skill } from "../../shared/Consts/Interfaces";
import { AVATAR_URL } from "../../shared/Consts/URLS";
import { useSelector } from "react-redux";
import { AppState } from "../../app/AppStore";

const profileStatistics: StatisticItem[] = [
    {
        title: 'Оценка',
        userKey: 'rate',
    },
];

const ProfileLeftColumn: React.FC = () => {
    const {user} = useSelector((state: AppState) => state.profile);
    const {user: myUser} = useSelector((state: AppState) => state.user);

    useEffect(() => {
        if (user !== undefined) {
            document.title = user.username;
        }
    }, [user]);

    return (
        <div className="profile-left-column">
            <div className="profile-avatar">
                {user === undefined && 
                    <div className="profile-avatar__img profile-avatar__img-mock">
                        <div className="profile-avatar__img-spinner">
                        </div>
                    </div>
                }
                {user !== undefined &&
                    <img className="profile-avatar__img" src={AVATAR_URL + user.avatar} alt="avatar"/>
                }
            </div>
            <div className="profile-stats">
                {profileStatistics.map((stat) => {
                    return (
                        <div className="profile-stats-item" key={stat.title}>
                            <div className="profile-stats-item__example-title">
                                {stat.title}
                            </div>
                            <div className="profile-stats-item__example-value">
                                {user === undefined && 
                                    <div className="profile-stats-item__example-mock">
                                        <div className="profile-stats-item__example-spinner">
                                        </div>
                                    </div>
                                }
                                {user !== undefined && 
                                    0
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="profile-tags">
                <div className="profile-tags-header">
                    <div className="profile-tags-header__title">
                        Навыки
                        <img className="profile-tags-header__img" title="Пользователь делится следующими навыками" src="/shared/question.png" alt=""/>
                    </div>
                    <div className="profile-tags-header__count">
                        {user === undefined && 0}
                        {user !== undefined && user.skills_to_share.length}
                    </div>
                </div>
                <div className="profile-tags-array">
                    {user !== undefined &&
                        user.skills_to_share.map((skill: Skill) => {
                            return (
                                <div className={`profile-tags-array__tag profile-tags-array__tag_${skill.level}`} title={`${CapitalizeString(skill.level)}`} key={skill.name}>
                                    {skill.name}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            {myUser?.id === user?.id && 
                <div className="profile-to-learn">
                    <div className="profile-to-learn-header">
                        <div className="profile-to-learn-header__title">
                            Я хочу изучить
                        </div>
                    </div>
                    <div className="profile-to-learn-array">
                        {user !== undefined &&
                            user.skills_to_learn.map((skill: Skill) => {
                                return (
                                    <div className={`profile-to-learn-array__tag profile-to-learn-array__tag_${skill.level}`} title={`${CapitalizeString(skill.level)}`} key={skill.name}>
                                        {skill.name}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            }
            {user !== undefined && 
                <div className="profile-preferred-format">
                    Предпочитает общаться
                    <div className="profile-preferred-format__example">
                        {PREFERRED_FORMAT_TRANSLATION[user.preferred_format as CommunicationFormat]}
                    </div>
                </div>
            }
        </div>
    )
};

export default ProfileLeftColumn;