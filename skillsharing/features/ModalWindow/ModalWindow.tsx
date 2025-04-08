import React, { useEffect } from 'react';
import './ModalWindow.scss'

export type ModalType = 'delete' | 'structurize';

export interface ModalWindowProps {
    agreeTitle: string,
    cancelTitle: string,
    windowTitle: string,
    agreeFunc: () => void,
    closeModal: () => void,
    modalType: ModalType,
}

const ModalWindow: React.FC<ModalWindowProps> = ({windowTitle, agreeTitle, cancelTitle, agreeFunc, closeModal, modalType}) => {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            let target = event.target as ParentNode | null;
            const modalWindow = document.querySelector('#modal-window') as HTMLElement;
    
            if (modalWindow === null) {
                return;
            }
        
            while (target !== null) {
                if (target === modalWindow) {
                    return;
                }
        
                target = target.parentNode;
            }
        }

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        }
    }, []);

    return (
        <div className='modal-wrapper'>
            <div id='modal-window' className='modal-window'>
                <div className='modal-window__content'>
                    {windowTitle}
                </div>
                <div className='modal-window-footer'>
                    <div className='modal-window-footer__cancel-button' onClick={closeModal}>
                        {cancelTitle}
                    </div>
                    <div className={'modal-window-footer__agree-button modal-window-footer__agree-button_' + modalType} onClick={() => {
                        agreeFunc();
                        closeModal();
                    }}>
                        {agreeTitle}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalWindow;