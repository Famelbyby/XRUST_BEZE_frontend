import React from 'react';
import '../../pages/Main/ui/Main.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';
import './MainHeader.scss';

const MainHeader: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.user);

    return (
        <div className="main-header">
            <div className="main-header-left">
                <div className="main-header-hello">
                    Добро пожаловать,
                    {user !== undefined && <>{' ' + user.username}</>}
                    {user === undefined && (
                        <div className="main-header-hello-mock">
                            <div className="main-header-hello-spinner"></div>
                        </div>
                    )}
                    !
                </div>
                <div className="main-header-questions">
                    Появились вопросы? Мы подобрали экспертов по вашим навыкам
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
