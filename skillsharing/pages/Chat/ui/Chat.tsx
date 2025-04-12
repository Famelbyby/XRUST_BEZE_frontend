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
import { GetChannelByIds } from '../api/Chat';
import RecorderBar from '../../../widgets/RecorderBar/RecorderBar';
import { finishVoiceMessage } from '../../../app/slices/RecorderSlice';

const Chat: React.FC = () => {
    const navigateTo = useNavigate();
    const params = useParams();
    const peerID: string | undefined = params.chatID;
    const dispatch = useDispatch<AppDispatch>();
    const {noPeerError} = useSelector((state: AppState) => state.chatMessages);
    const {user} = useSelector((state: AppState) => state.user);
    const {voiceMessageId} = useSelector((state: AppState) => state.recorder);
    //const {isFetched, companion} = useSelector((state: AppState) => state.chatMessages);

    useEffect(() => {
        if (user !== undefined) {
            dispatch(GetChannelByIds({userId: user.id, peerId: peerID!}));
        }

        return () => {
            dispatch(clearAllMessages());
            dispatch(finishVoiceMessage());
        }
    }, [user, peerID, dispatch]);

    return (
        <div className='chat-page'>
            {!noPeerError &&
                <>
                    <div className='chat-go-back'>
                        <div className='chat-go-back-wrapper' onClick={() => {
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