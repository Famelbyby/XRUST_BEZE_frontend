import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';
import './ProfileMobileContent.scss';
import { Link } from 'react-router';

const ProfileMobileContent: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.profile);

    return (
        <div className="profile-mobile-content">
            <div className="profile-mobile-content-description">
                О себе
                <div className="profile-mobile-content-description__field">
                    {user === undefined && (
                        <div className="profile-mobile-content-description__field-mock">
                            <div className="profile-mobile-content-description__field-spinner"></div>
                        </div>
                    )}
                    {user !== undefined && (user.bio || '*стрекот сверчков*')}
                </div>
            </div>
            {user !== undefined && (
                <div className="profile-mobile-content-hrefs">
                    Ссылки
                    {user.hrefs && user.hrefs.length > 0 && (
                        <div className="profile-mobile-content-hrefs-examples">
                            {user.hrefs.map((href: string, index: number) => {
                                const isMatched = !!href.match(/http(s)*:\/\/(.)+\.(.)+/);

                                return (
                                    <div
                                        key={index}
                                        className="profile-mobile-content-hrefs-examples-item"
                                    >
                                        {isMatched && (
                                            <a
                                                href={href}
                                                target="_blank"
                                                className="profile-mobile-content-hrefs-examples__href"
                                                aria-label={`Ссылка на ${href}`}
                                            >
                                                {href}
                                            </a>
                                        )}
                                        {!isMatched && <>{href}</>}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {(user.hrefs === null || (user.hrefs && user.hrefs.length === 0)) && (
                        <div className="profile-mobile-content-hrefs__no-hrefs">Тут пусто</div>
                    )}
                </div>
            )}
            <div className="profile-mobile-content-materials">
                Учебные материалы
                <Link
                    to={`/profile-materials/${user?.id}`}
                    aria-label="Перейти к учебным материалам"
                >
                    <div className="profile-mobile-content-materials-go-page">
                        <img
                            className="profile-mobile-content-materials-go-page__img"
                            src="/shared/go-back.png"
                            alt=""
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProfileMobileContent;
