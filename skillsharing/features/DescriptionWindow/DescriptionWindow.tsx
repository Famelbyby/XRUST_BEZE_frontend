import React from 'react';
import './DescriptionWindow.scss';

interface DescriptionWindowProps extends React.PropsWithChildren {
    confirm?: {
        text: string;
        key: string;
    };
    callback?: () => void;
    windowClass: string;
}

const DescriptionWindow: React.FC<DescriptionWindowProps> = ({
    windowClass,
    confirm,
    callback,
    children,
}) => {
    return (
        <div className={'description-window ' + windowClass}>
            {children}
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

export default DescriptionWindow;
