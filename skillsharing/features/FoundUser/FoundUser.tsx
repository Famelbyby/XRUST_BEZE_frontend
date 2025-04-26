import React from 'react';
import {ProfileType} from '../../pages/Profile/ui/ProfileTypes'
import { Link } from 'react-router';
import './FoundUser.scss'
import { FormatRelativeTimeInPastInDays } from '../../shared/Functions/FormatDate';
import { AVATAR_URL } from '../../shared/Consts/URLS';
import SkillsLine from '../SkillsLine/SkillsLine';

interface FoundUserPropTypes {
    user: ProfileType,
}

const FoundUser: React.FC<FoundUserPropTypes> = ({user}) => {
    return (
        <Link to={`/profile/${user.id}`}>
            <div className='found-user'>
                <div className="found-user-avatar">
                    <img className="found-user-avatar__img" src={AVATAR_URL + user.avatar} alt="" />
                </div>
                <div className='found-user-info'>
                    <div className="found-user-header">
                        <div className='found-user-header__name'>
                            {user.username}
                        </div>
                        <div className='found-user-header__tags'>
                            <SkillsLine skills={user.skills_to_share} />
                        </div>
                    </div>
                    <div className='found-user-footer'>
                        <div className='found-user-last-seen'>
                            <img className="found-user-last-seen__img" src="/shared/clock.png" alt="" />
                            {FormatRelativeTimeInPastInDays(new Date(user.last_active_at))}
                        </div>
                        <div className='found-user-stats'>
                            <div className='found-user-footer__rate'>
                                Оценка
                                <div className='found-user-footer__num'>
                                    0
                                </div>
                            </div>
                            <div className='found-user-footer__feedbacks'>
                                Отзывы
                                <div className='found-user-footer__num'>
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default FoundUser;