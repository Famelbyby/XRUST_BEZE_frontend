import React from 'react';
import { useNavigate } from 'react-router';
import './UserMaterialsHeader.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';

const UserMaterialsHeader: React.FC = () => {
    const navigateTo = useNavigate();

    const { theme } = useSelector((state: AppState) => state.user);

    return (
        <div className="user-materials-header">
            <div className="user-materials-header-go-back">
                <div
                    className="user-materials-header-go-back-wrapper"
                    aria-label="Вернуться"
                    onClick={() => {
                        navigateTo(-1);
                    }}
                >
                    <img
                        className={'user-materials-header-go-back__img' + ` ${theme}-mode__img`}
                        src="/shared/go-back.png"
                        alt=""
                    />
                </div>
            </div>
            Учебные материалы пользователя
        </div>
    );
};

export default UserMaterialsHeader;
