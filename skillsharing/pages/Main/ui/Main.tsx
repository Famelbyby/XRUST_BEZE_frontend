import React from 'react';
import MainContent from '../../../widgets/MainContent/MainContent';
import MainHeader from '../../../widgets/MainHeader/MainHeader';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/AppStore';

const Main: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);

    return (
        <div
            className={
                'main-page' +
                (theme === 'light' ? '' : ` ${theme}-mode__block ${theme}-mode__bright-text`)
            }
        >
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <MainHeader />
            <MainContent />
        </div>
    );
};

export default Main;
