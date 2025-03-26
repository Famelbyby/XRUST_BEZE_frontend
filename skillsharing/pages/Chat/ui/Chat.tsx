import React, { useEffect } from 'react';
import './Chat.scss'
import ChatFooter from '../../../widgets/ChatFooter/ChatFooter';
import ChatHeader from '../../../widgets/ChatHeader/ChatHeader'
import { useNavigate, useParams, useSearchParams } from 'react-router';
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
    const [query] = useSearchParams();
    const peerID: string | undefined = params.chatID;
    
    if (peerID === undefined) {
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

    const channelID: string | null = query.get('channel_id');

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
                    <ChatHeader peerID={peerID!}/>
                    <ChatContent channelID={channelID} />
                    <ChatFooter peerID={peerID!}/>
                </div>
            </div>
        </Provider>
    )
}

export default Chat;