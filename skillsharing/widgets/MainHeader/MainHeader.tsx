import React from 'react';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import '../../pages/Main/ui/Main.scss'

interface MainHeaderPropTypes {
    user: ProfileType | undefined,
}

const MainHeader: React.FC<MainHeaderPropTypes> = ({user}) => {
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