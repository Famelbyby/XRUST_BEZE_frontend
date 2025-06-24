import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';
import { setIsErrored } from '../../app/slices/UserSlice';
import './ErroredWindow.scss';

const ErrorWindow: React.FC = () => {
    const { isErrored, errorMessage, theme } = useSelector((state: AppState) => state.user);
    const window = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isErrored) {
            if (window.current) {
                window.current.classList.add('errored-window_visible');

                setTimeout(() => {
                    window.current?.classList.remove('errored-window_visible');

                    dispatch(setIsErrored({ isErrored: false }));
                }, 2000);
            }
        }
    }, [isErrored]);

    return (
        <div ref={window} className="errored-window">
            <div className={'errored-window-content' + ` ${theme}-mode__error-block`}>
                {errorMessage}
            </div>
        </div>
    );
};

export default ErrorWindow;
