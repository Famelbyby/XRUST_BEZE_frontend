import React from 'react';
import './404.scss'

const NotFound: React.FC = () => {
    return (
        <div className="not-found">
            404
            <div className="not-found__description">
                Not Found
            </div>
        </div>
    );
};

export default NotFound;