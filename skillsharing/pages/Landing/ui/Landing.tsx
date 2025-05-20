import React from 'react';
import './Landing.scss';

const LandingContent: React.FC = () => {
    return <div className="landing-content"></div>;
};

const Landing: React.FC = () => {
    return (
        <div className="landing-page">
            <LandingContent />
        </div>
    );
};

export default Landing;
