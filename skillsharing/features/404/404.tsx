import React from 'react';
import './404.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';

const NotFound: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);

    return (
        <div className={'not-found' + (theme === 'light' ? '' : ` ${theme}-mode__dull-text`)}>
            404
            <div className="not-found__description">Not Found</div>
        </div>
    );
};

export default NotFound;
