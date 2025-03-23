import React, { useEffect, useRef, useState } from "react";
import { ICompanion } from "./ChatHeaderTypes";
import axios from "axios";
import { Link } from "react-router";
import { GetChatCompanion } from "../../api/ChatCompanion";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedMessages, setChannelID, editMessage } from "../../../../widgets/Message/MessagesSlice";
import { ChatState } from "../ChatStore";
import MainWebSocket from './../../../../shared/WebSocket/WebSocket'
import { IDeletingMessage, IMessage } from "../../../../widgets/Message/MessageTypes";

interface ChatHeaderPropTypes {
    companionID: string,
}

const ChatHeader: React.FC<ChatHeaderPropTypes> = ({companionID}) => {
    const [companion, setCompanion] = useState<ICompanion>();
    const componentIsMounted = useRef(true);

    const dispatch = useDispatch();
    const {selectedMessages} = useSelector((state: ChatState) => state.chatMessages);
    const selectedMessagesCount = selectedMessages.length;

    function handleDeletingMessage() {
        const userId: IMessage["user_id"] = (localStorage.getItem('user_id') || '0');

        selectedMessages.forEach((selectedMessage: IMessage) => {
            const messageJSON: IDeletingMessage = {
                "event": "EventText",
                "user_id": userId,
                "channel_id": companionID,
                "type": "delete_message",
                "message_id": selectedMessage.message_id,
            }
    
            MainWebSocket.sendMessage(JSON.stringify(messageJSON));
        })
        
        dispatch(removeSelectedMessages());
    }

    useEffect(() => {
        function companionGot(companionData: ICompanion) {
            if (componentIsMounted) {
                setCompanion(companionData);
            }
        }

        GetChatCompanion(2, companionGot);
        dispatch(setChannelID(companionID));

        return () => {
            componentIsMounted.current = false;
            dispatch(setChannelID(""));
        };
    }, [dispatch, companionID]);

    console.log(selectedMessages);

    return (
        <div className='chat-header'>
            {selectedMessagesCount === 0 &&
                <>
                    <Link to={companion === undefined ? window.location.href : `/profile/${companion.userID}`}>
                        <div className='chat-header-user'>
                            {companion && <img className='chat-header-user__avatar' src={companion.avatar} alt='' />}
                            {(companion === undefined) && 
                                <div className="chat-header-user__avatar chat-header-user__avatar-mock">
                                    <div className="chat-header-spinner">
                                    </div>
                                </div>}
                            <div className='chat-header-user-info'>
                                {companion && 
                                    <div className='chat-header-user__name'>
                                        {companion.name}
                                    </div>}
                                {(companion === undefined) && 
                                    <div className='chat-header-user__name-mock'>
                                        <div className="chat-header-spinner">
                                        </div>
                                    </div>}
                                {companion && 
                                    <div className='chat-header-user__online'>
                                        {companion.isOnline ? 'Online' : 'Offline'}
                                    </div>}
                                {(companion === undefined) && 
                                    <div className='chat-header-user__online-mock'>
                                        <div className="chat-header-spinner">
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </Link>
                    <div className='chat-header-chat-info'>
                        <div className='chat-header-chat-info__tags'>
                            CS:GO Dota2
                        </div>
                        <div className='chat-header-chat-info__rating'>
                            Оценка 4.8
                        </div>
                    </div>
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