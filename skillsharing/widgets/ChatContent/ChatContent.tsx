import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../entity/Message/Message"
import { IMessage } from "../../entity/Message/MessageTypes";
import { GetChatMessages } from "../../pages/Chat/api/Chat";
import { addMessage, replaceMessages, deleteMessage, updateMessage, clearAllMessages } from "../../app/slices/ChatSlice";
import { AppDispatch, AppState } from "../../app/AppStore";
import { addObserver, removeObserver } from "../../app/slices/WebSocketSlice";
import './ChatContent.scss'

interface ChatContentPropTypes {
    channelID: string | null,
}

const ChatContent: React.FC<ChatContentPropTypes> = ({channelID}) => {
    const {messages, selectedMessages} = useSelector((state: AppState) => state.chatMessages);
    const dispatch = useDispatch<AppDispatch>();

    /**
     * Adds messages movement in chat
     */
    useEffect(() => {
        dispatch(addObserver({observerName: 'chat-messages', observerCallback: (data: string) => {
            const message: IMessage = JSON.parse(data);
            
            switch (message.type) {
                case 'send_message':
                    dispatch(addMessage(message));
                    break;
                case 'update_message':
                    dispatch(updateMessage(message));
                    break;
                case 'delete_message':
                    dispatch(deleteMessage(message));
                    break;
            }
        }}));

        return () => {
            dispatch(removeObserver('chat-messages'));
        };
    }, [dispatch]);

    /**
     * Gets chat messages
     */
    useEffect(() => {
        if (channelID !== null) {
            dispatch(GetChatMessages(channelID));
        } else {
            dispatch(replaceMessages([]));
        }

        return () => {
            dispatch(clearAllMessages());
        };
    }, [dispatch, channelID]);

    return (
        <div key={"chat-content"} id='chat-content' className='chat-content'>
            {messages === undefined && 
                <div className='chat-content__mock'>
                    <div className='chat-content__spinner'>
                    </div>
                </div>}
            {messages !== undefined && messages.length === 0 &&
                <div className="chat-content__no-messages">
                    Сообщений нет
                </div>
            }
            {messages !== undefined && messages.length > 0 && messages.map((message) => {
                const isSelected: boolean = selectedMessages!.find((selectedMessage) => selectedMessage.message_id === message.message_id) !== undefined;

                return (
                    <Message message={message} key={message.message_id} isSelected={isSelected} />
                );
            })}
        </div>
    )
};

export default ChatContent;