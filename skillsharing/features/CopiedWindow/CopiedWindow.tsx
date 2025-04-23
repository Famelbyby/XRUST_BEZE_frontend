import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';
import { setIsCopied } from '../../app/slices/UserSlice';
import './CopiedWindow.scss'

const CopiedWindow: React.FC = () => {
    const {isCopied} = useSelector((state: AppState) => state.user);
    const window = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isCopied) {
            if (window.current) {
                window.current.classList.add('copied-window_visible');

                setTimeout(() => {
                    window.current?.classList.remove('copied-window_visible');

                    dispatch(setIsCopied(false));
                }, 2000);
            }
        }
    }, [isCopied]);

    return (
        <div ref={window} className='copied-window'>
            <div className='copied-window-content'>
                Скопировано
                <img id="copied-window" className='copied-window__img' src='/ChatPage/check.png' alt=''/>
            </div>
        </div>
    )
};

export default CopiedWindow;