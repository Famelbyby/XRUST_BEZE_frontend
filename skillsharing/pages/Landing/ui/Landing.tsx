import React from 'react';
import './Landing.scss';

const LandingContent: React.FC = () => {
    return <div className="landing-content"></div>;
};

const LandingFooter: React.FC = () => {
    return (
        <div className="landing-footer">
            <div className="landing-footer-copyrights">© XRUST BEZE 2025</div>
            <div className="landing-footer-logo">
                <img
                    className="landing-footer-logo__img"
                    src="/shared/skillsharing_logo_white.png"
                    alt="SkillSharing"
                />
            </div>
        </div>
    );
};

const Landing: React.FC = () => {
    return (
        <div className="landing-page">
            <LandingContent />
            <LandingFooter />
        </div>
    );
};

export default Landing;
