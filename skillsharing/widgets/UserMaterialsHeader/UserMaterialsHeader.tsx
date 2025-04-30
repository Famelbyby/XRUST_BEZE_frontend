import React from 'react';
import {useNavigate} from 'react-router';
import './UserMaterialsHeader.scss'

const UserMaterialsHeader: React.FC = () => {
    const navigateTo = useNavigate();

    return (
        <div className='user-materials-header'>
            <div className='user-materials-header-go-back'>
                <div className='user-materials-header-go-back-wrapper' aria-label='Вернуться' onClick={() => {
                    navigateTo(-1);
                }}>
                    <img className='user-materials-header-go-back__img' src='/shared/go-back.png' alt='' />
                </div>
            </div>
            Учебные материалы пользователя
        </div>
    );
};

export default UserMaterialsHeader;