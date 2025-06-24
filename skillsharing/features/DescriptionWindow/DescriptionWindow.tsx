import React from 'react';
import './DescriptionWindow.scss';

interface DescriptionWindowProps extends React.PropsWithChildren {
    confirm?: {
        text: string;
        key: string;
    };
    callback?: () => void;
    windowClass: string;
    theme?: string;
}

const DescriptionWindow: React.FC<DescriptionWindowProps> = ({
    windowClass,
    confirm,
    callback,
    children,
    theme = 'light',
}) => {
    return (
        <div className={'description-window ' + windowClass + ` ${theme}-mode__block`}>
            {children}
            {confirm !== undefined && (
                <div
                    className={'description-window__confirm' + ` ${theme}-mode__bright-block`}
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
