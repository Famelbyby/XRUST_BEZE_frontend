import React from "react";
import MainContent from '../../../widgets/MainContent/MainContent'
import MainHeader from '../../../widgets/MainHeader/MainHeader'
import { Helmet } from "react-helmet";

const Main: React.FC = () => {
    return (
        <div className="main-page">
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <MainHeader />
            <MainContent />
        </div>
    )
};

export default Main;