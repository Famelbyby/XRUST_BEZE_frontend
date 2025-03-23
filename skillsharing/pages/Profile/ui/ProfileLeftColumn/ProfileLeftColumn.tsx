import React from "react";
import {StatisticItem} from './ProfileLeftColumnTypes'
import { ProfileType } from "../ProfileTypes";

const profileStatistics: StatisticItem[] = [
    {
        title: 'Оценка',
        userKey: 'rate',
    },
    {
        title: 'Помощей',
        userKey: 'helps',
    },
    {
        title: 'Рейтинг',
        userKey: 'rating',
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
                    <img className="profile-avatar__img" src={profile.avatar} alt="avatar"/>
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
                                {profile !== undefined && profile[stat.userKey]}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="profile-tags">
                <div className="profile-tags-header">
                    <div className="profile-tags-header__title">
                        Теги
                    </div>
                    <div className="profile-tags-header__count">
                        {profile === undefined && 0}
                        {profile !== undefined && profile.tags.length}
                    </div>
                </div>
                <div className="profile-tags-array">
                    {profile !== undefined &&
                        profile.tags.map((tag: string) => {
                            return (
                                <div className="profile-tags-array__tag" key={tag}>
                                    {tag}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default ProfileLeftColumn;