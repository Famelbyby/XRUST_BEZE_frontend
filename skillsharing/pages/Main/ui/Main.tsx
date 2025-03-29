import React from "react";
import MainContent from '../../../widgets/MainContent/MainContent'
import MainHeader from '../../../widgets/MainHeader/MainHeader'

const Main: React.FC = () => {
    return (
        <div className="main-page">
            <MainHeader />
            <MainContent />
        </div>
    )
};

export default Main;