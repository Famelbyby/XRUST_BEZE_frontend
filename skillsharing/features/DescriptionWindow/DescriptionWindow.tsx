import React from 'react';
import './DescriptionWindow.scss';

interface DescriptionWidowProps {
    title: string;
    confirm?: {
        text: string;
        key: string;
    };
    callback?: () => void;
    windowClass: string;
}

const DescriptionWidow: React.FC<DescriptionWidowProps> = ({
    windowClass,
    title,
    confirm,
    callback,
}) => {
    return (
        <div className={'description-window ' + windowClass}>
            {title}
            {confirm !== undefined && (
                <div
                    className="description-window__confirm"
                    onClick={(event) => {
                        event.stopPropagation();

                        localStorage.setItem(confirm.key, 'true');

                        if (callback !== undefined) {
                            callback();
                        }
                    }}
                >
                    {confirm.text}
                </div>
            )}
            <div className={'description-window__arrow ' + windowClass + '__arrow'}></div>
        </div>
    );
};

export default DescriptionWidow;
