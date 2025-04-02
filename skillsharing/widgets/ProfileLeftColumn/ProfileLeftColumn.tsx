import React from "react";
import { StatisticItem} from './ProfileLeftColumnTypes'
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import {CapitalizeString} from '../../shared/Functions/FormatStrings'
import {PREFERRED_FORMAT_TRANSLATION} from '../../shared/Consts/Translations'
import './ProfileLeftColumn.scss'
import { Skill } from "../../shared/Consts/Interfaces";
import { AVATAR_URL } from "../../shared/Consts/URLS";

const profileStatistics: StatisticItem[] = [
    {
        title: 'Оценка',
        userKey: 'rate',
    },
    {
        title: 'Помощей',
        userKey: 'helps',
    },
];

interface ProfileLeftColumnPropTypes {
    profile: ProfileType | undefined,
}

const ProfileLeftColumn: React.FC<ProfileLeftColumnPropTypes> = ({profile}) => {
    return (
        <div className="profile-left-column">
            <div className="profile-avatar">
                {profile === undefined && 
                    <div className="profile-avatar__img profile-avatar__img-mock">
                        <div className="profile-avatar__img-spinner">
                        </div>
                    </div>
                }
                {profile !== undefined &&
                    <img className="profile-avatar__img" src={AVATAR_URL + profile.avatar} alt="avatar"/>
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
                                {profile === undefined && 
                                    <div className="profile-stats-item__example-mock">
                                        <div className="profile-stats-item__example-spinner">
                                        </div>
                                    </div>
                                }
                                {profile !== undefined && 
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
                        Теги
                        <img className="profile-tags-header__img" title="Пользователь делится следующими навыками" src="/shared/question.png" alt=""/>
                    </div>
                    <div className="profile-tags-header__count">
                        {profile === undefined && 0}
                        {profile !== undefined && profile.skills_to_learn.length}
                    </div>
                </div>
                <div className="profile-tags-array">
                    {profile !== undefined &&
                        profile.skills_to_share.map((skill: Skill) => {
                            return (
                                <div className={`profile-tags-array__tag profile-tags-array__tag_${skill.level}`} title={`${CapitalizeString(skill.level)}`} key={skill.name}>
                                    {skill.name}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            {profile !== undefined && 
                <div className="profile-preferred-format">
                    Предпочитает общаться
                    <div className="profile-preferred-format__example">
                        {PREFERRED_FORMAT_TRANSLATION[profile.preferred_format]}
                    </div>
                </div>
            }
        </div>
    )
};

export default ProfileLeftColumn;