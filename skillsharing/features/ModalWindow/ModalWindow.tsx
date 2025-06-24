import React, { useEffect } from 'react';
import './ModalWindow.scss';

export type ModalType = 'delete' | 'structurize';

export interface ModalWindowProps {
    agreeTitle: string;
    cancelTitle: string;
    windowTitle: string;
    agreeFunc: () => void;
    closeModal: () => void;
    modalType: ModalType;
    theme?: string;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
    windowTitle,
    agreeTitle,
    cancelTitle,
    agreeFunc,
    closeModal,
    modalType,
    theme = 'light',
}) => {
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
        };
    }, []);

    function handleClosing() {
        setTimeout(closeModal, 500);

        const modalWrapper = document.getElementById('modal-wrapper') as HTMLElement;

        if (modalWrapper !== null) {
            modalWrapper.classList.add('modal-wrapper_closing');
        }
    }

    return (
        <div id="modal-wrapper" className="modal-wrapper">
            <div id="modal-window" className="modal-window">
                <div className="modal-window__content">{windowTitle}</div>
                <div className="modal-window-footer">
                    <div className="modal-window-footer__cancel-button" onClick={handleClosing}>
                        {cancelTitle}
                    </div>
                    <div
                        className={
                            'modal-window-footer__agree-button modal-window-footer__agree-button_' +
                            modalType +
                            ` ${theme}-mode__bright-block`
                        }
                        onClick={() => {
                            setTimeout(agreeFunc, 500);
                            handleClosing();
                        }}
                    >
                        {agreeTitle}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
