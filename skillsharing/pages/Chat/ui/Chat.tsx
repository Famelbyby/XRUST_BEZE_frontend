import React, { useEffect } from 'react';
import './Chat.scss'
import ChatFooter from '../../../widgets/ChatFooter/ChatFooter';
import ChatHeader from '../../../widgets/ChatHeader/ChatHeader'
import { useNavigate, useParams } from 'react-router';
import ChatContent from '../../../widgets/ChatContent/ChatContent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../app/AppStore';
import NotFound from '../../../features/404/404';
import { clearAllMessages } from '../../../app/slices/ChatSlice';
import { GetChannelByIds, GetCompanion } from '../api/Chat';
import RecorderBar from '../../../widgets/RecorderBar/RecorderBar';
import { clearRecorded, finishVoiceMessage, setRecorded } from '../../../app/slices/RecorderSlice';
import { Helmet } from 'react-helmet';
import { clearInputAndAttachments, clearUpdate } from '../../../app/slices/ManageMessageSlice';

const Chat: React.FC = () => {
    const navigateTo = useNavigate();
    const params = useParams();
    const peerID: string | undefined = params.chatID;
    const dispatch = useDispatch<AppDispatch>();
    const {noPeerError, noChatError} = useSelector((state: AppState) => state.chatMessages);
    const {user} = useSelector((state: AppState) => state.user);
    const {voiceMessageId} = useSelector((state: AppState) => state.recorder);

    useEffect(() => {
        if (user !== undefined) {
            dispatch(GetChannelByIds({userId: user.id, peerId: peerID!}));
        }

        return () => {
            dispatch(clearAllMessages());
            dispatch(finishVoiceMessage());
            dispatch(setRecorded(new Blob()));
            dispatch(clearRecorded());
            dispatch(clearInputAndAttachments());
            dispatch(clearUpdate());
        }
    }, [user, peerID, dispatch]);

    useEffect(() => {
        if (noChatError) {
            dispatch(GetCompanion(peerID!));
        }
    }, [noChatError]);

    useEffect(() => {
            if (noPeerError) {
                const noIndex = document.createElement('meta');
                
                noIndex.name = 'robots';
                noIndex.content = 'noindex';
    
                document.head.appendChild(noIndex);
            }
    
            return () => {
                document.querySelector('meta[content="noindex"]')?.remove();
            }
        }, [noPeerError]);

    return (
        <div className='chat-page'>
            <Helmet>
                <title>Чат</title>
            </Helmet>
            {!noPeerError &&
                <>
                    <audio id='voice-messages-recorder' className='voice-messages-recorder' />
                    <div className='chat-go-back'>
                        <div className='chat-go-back-wrapper' aria-label='Вернуться' onClick={() => {
                            navigateTo(-1);
                        }}>
                            <img className='chat-go-back__img' src='/shared/go-back.png' alt='' />
                        </div>
                    </div>
                    <div className='chat-dialog'>
                        {voiceMessageId !== undefined && 
                            <RecorderBar />
                        }
                        <ChatHeader />
                        <ChatContent />
                        <ChatFooter />
                    </div>
                </> 
            }
            {noPeerError && 
                <NotFound />
            }
        </div>
    )
}

export default Chat;