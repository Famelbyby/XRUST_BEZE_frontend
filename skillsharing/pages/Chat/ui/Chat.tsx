import React, { useEffect } from 'react';
import './Chat.scss'
import ChatFooter from '../../../widgets/ChatFooter/ChatFooter';
import ChatHeader from '../../../widgets/ChatHeader/ChatHeader'
import { useNavigate, useParams } from 'react-router';
import { Provider } from 'react-redux';
import {chatStore} from '../../../app/stores/ChatStore'
import ChatContent from '../../../widgets/ChatContent/ChatContent';

function handleEnter(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
        return;
    }

    const sendMessageButton: HTMLButtonElement | null = document.querySelector('#send-message');

    if (sendMessageButton !== null) {
        sendMessageButton.click();
    }
}

const Chat: React.FC = () => {
    const navigateTo = useNavigate();
    const params = useParams();
    const companionID: string | undefined = params.chatID;
    
    if (companionID === undefined || Number.isNaN(+companionID)) {
        navigateTo('/chats');
    }

    /**
     * Adds eventListener on 'Enter' to send messages or confirm editing
     */
    useEffect(() => {
        window.addEventListener('keypress', handleEnter);

        return () => {
            window.removeEventListener('keypress', handleEnter);
        }
    }, []);

    return (
        <Provider store={chatStore}>
            <div className='chat-page'>
                <div className='chat-go-back'>
                    <div className='chat-go-back-wrapper' onClick={() => {
                        navigateTo(-1);
                    }}>
                        <img className='chat-go-back__img' src='/Chat/go-back.png' alt='' />
                    </div>
                </div>
                <div className='chat-dialog'>
                    <ChatHeader companionID={companionID!}/>
                    <ChatContent />
                    <ChatFooter companionID={companionID!}/>
                </div>
            </div>
        </Provider>
    )
}

export default Chat;