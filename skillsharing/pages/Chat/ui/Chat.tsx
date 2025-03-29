import React, { useEffect } from 'react';
import './Chat.scss'
import ChatFooter from '../../../widgets/ChatFooter/ChatFooter';
import ChatHeader from '../../../widgets/ChatHeader/ChatHeader'
import { useNavigate, useParams, useSearchParams } from 'react-router';
import ChatContent from '../../../widgets/ChatContent/ChatContent';

const Chat: React.FC = () => {
    const navigateTo = useNavigate();
    const params = useParams();
    const [query] = useSearchParams();
    const peerID: string | undefined = params.chatID;
    
    useEffect(() => {
        if (peerID === undefined) {
            navigateTo('/chats');
        }
    }, [peerID, navigateTo]);

    const channelID: string | null = query.get('channel_id');

    return (
        <div className='chat-page'>
            <div className='chat-go-back'>
                <div className='chat-go-back-wrapper' onClick={() => {
                    navigateTo(-1);
                }}>
                    <img className='chat-go-back__img' src='/Chat/go-back.png' alt='' />
                </div>
            </div>
            <div className='chat-dialog'>
                <ChatHeader peerID={peerID}/>
                <ChatContent channelID={channelID} />
                <ChatFooter peerID={peerID}/>
            </div>
        </div>
    )
}

export default Chat;