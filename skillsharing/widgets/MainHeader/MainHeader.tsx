import React from 'react';
import '../../pages/Main/ui/Main.scss'
import { useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';

const MainHeader: React.FC = () => {
    const {user} = useSelector((state: AppState) => state.profile);

    return (
        <div className='main-header'>
            <div className='main-header-hello'>
                С возвращением, 
                { user !== undefined && 
                    <>
                        {' ' + user.username}
                    </>
                }
                { user === undefined && 
                    <div className='main-header-hello-mock'>
                        <div className='main-header-hello-spinner'>
                        </div>
                    </div>
                }
                !
            </div>
            <div className='main-header-questions'>
                Появились вопросы? Мы поможем Вам с выбором эксперта
            </div>
        </div>
    );
};

export default MainHeader;