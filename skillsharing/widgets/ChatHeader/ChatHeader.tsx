import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { GetProfile } from "../../pages/Profile/api/Profile";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedMessages, setPeerID, editMessage, clearAll } from "../../entity/Message/slice/MessagesSlice";
import { ChatState } from "../../app/stores/ChatStore";
import MainWebSocket from './../../shared/WebSocket/WebSocket'
import { IDeletingMessage, IMessage } from "../../entity/Message/MessageTypes";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import { FormatRelativeTimeInPastInDays } from "../../shared/Functions/FormatDate";
import { Skill } from "../ProfileLeftColumn/ProfileLeftColumnTypes";

interface ChatHeaderPropTypes {
    companionID: string,
}

const ChatHeader: React.FC<ChatHeaderPropTypes> = ({companionID}) => {
    const [companion, setCompanion] = useState<ProfileType>();
    const componentIsMounted = useRef(true);

    const dispatch = useDispatch();
    const {selectedMessages, channelID} = useSelector((state: ChatState) => state.chatMessages);
    const selectedMessagesCount = selectedMessages.length;

    function handleDeletingMessage() {
        const userId: IMessage["user_id"] = (localStorage.getItem('user_id') || '67e018ff9d65eb861882040a');

        selectedMessages.forEach((selectedMessage: IMessage) => {
            const messageJSON: IDeletingMessage = {
                "event": "EventText",
                "user_id": userId,
                "peer_id": companionID,
                "channel_id": channelID,
                "type": "delete_message",
                "message_id": selectedMessage.message_id,
            }
    
            MainWebSocket.sendMessage(JSON.stringify(messageJSON));
        })
        
        dispatch(removeSelectedMessages());
    }

    useEffect(() => {
        function companionGot(companionData: ProfileType) {
            if (componentIsMounted) {
                setCompanion(companionData);
            }
        }

        GetProfile(, companionGot);
        dispatch(setPeerID(companionID));

        return () => {
            componentIsMounted.current = false;
            dispatch(clearAll());
        };
    }, [dispatch, companionID]);

    let companionTags: string = '';

    if (companion !== undefined) {
        companion.skills_to_learn.forEach((skill_to_learn: Skill) => {
            companionTags += skill_to_learn.name + ' ';
        })
    }

    return (
        <div className='chat-header'>
            {selectedMessagesCount === 0 &&
                <>
                    <Link to={companion === undefined ? window.location.href : `/profile/${companion.id}`}>
                        <div className='chat-header-user'>
                            {companion && <img className='chat-header-user__avatar' src={companion.avatar_url} alt='' />}
                            {(companion === undefined) && 
                                <div className="chat-header-user__avatar chat-header-user__avatar-mock">
                                    <div className="chat-header-spinner">
                                    </div>
                                </div>}
                            <div className='chat-header-user-info'>
                                {companion !== undefined && 
                                    <div className='chat-header-user__name'>
                                        {companion.username}
                                    </div>}
                                {(companion === undefined) && 
                                    <div className='chat-header-user__name-mock'>
                                        <div className="chat-header-spinner">
                                        </div>
                                    </div>}
                                {companion !== undefined && 
                                    <div className='chat-header-user__online'>
                                        {FormatRelativeTimeInPastInDays(new Date(companion.last_active_at))}
                                    </div>}
                                {(companion === undefined) && 
                                    <div className='chat-header-user__online-mock'>
                                        <div className="chat-header-spinner">
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </Link>
                    {companion !== undefined && 
                        <div className='chat-header-chat-info'>
                            <div className='chat-header-chat-info__tags'>
                                {companionTags}
                            </div>
                            <div className='chat-header-chat-info__rating'>
                                Оценка 4.8
                            </div>
                        </div>
                    }
                </>
            }
            {selectedMessagesCount > 0 && 
                <>
                    <div className="chat-header-remove-selection">
                        <img className="chat-header-remove-selection__img" src="/Chat/cross.png" alt="Отменить выделение" onClick={() => dispatch(removeSelectedMessages())}/>
                        {selectedMessagesCount}
                    </div>
                    <div className="chat-header-controls">
                        {selectedMessagesCount === 1 &&
                            <>
                                <img className="chat-header-controls__img chat-header-controls__edit" src="/shared/pen.png" alt="Изменить сообщение" onClick={() => {
                                    dispatch(editMessage());
                                }}/>
                                <img className="chat-header-controls__img chat-header-controls__copy" src="/Chat/copy.png" alt="Копировать сообщение" onClick={() => {
                                    navigator.clipboard.writeText(selectedMessages[0].payload);

                                    dispatch(removeSelectedMessages());
                                }} />
                            </>   
                        }
                        <img className="chat-header-controls__img chat-header-controls__delete" src="/Chat/delete.png" alt="Удалить сообщения" onClick={handleDeletingMessage} />
                    </div>
                </>
            }
        </div>
    )
};

export default ChatHeader;