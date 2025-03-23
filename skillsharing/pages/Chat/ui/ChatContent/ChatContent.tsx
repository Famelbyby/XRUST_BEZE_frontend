import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../widgets/Message/Message";
import { IMessage } from "../../../../widgets/Message/MessageTypes";
import { GetChatMessages } from "../../api/ChatMessages";
import { addMessage, replaceMessages, deleteMessage } from "../../../../widgets/Message/MessagesSlice";
import MainWebSocket from '../../../../shared/WebSocket/WebSocket'
import { ChatState } from "../ChatStore";

const ChatContent: React.FC = () => {
    const {messages, selectedMessages} = useSelector((state: ChatState) => state.chatMessages);
    const dispatch = useDispatch();
    const componentIsMounted = useRef(true);
    const isRefreshed = useRef(false);

    /**
     * Adds messages movement in chat
     */
    useEffect(() => {
        MainWebSocket.addObserver('chat-messages', (data: string) => {
            const message: IMessage = JSON.parse(data);
            
            switch (message.type) {
                case 'send_message':
                    dispatch(addMessage(message));
                    break;
                case 'update_message':
                case 'delete_message':
                    dispatch(deleteMessage(message));
                    break;
            }
        });

        return () => {
            MainWebSocket.removeObserver('chat-messages');
        };
    }, [dispatch]);

    /**
     * Gets chat messages
     */
    useEffect(() => {
        GetChatMessages(2, (messagesData: IMessage[]) => {
            if (componentIsMounted) {
                dispatch(replaceMessages(messagesData));

                isRefreshed.current = true;
            }
        });

        return () => {
            componentIsMounted.current = false;
        };
    }, [dispatch]);

    return (
        <div key={"chat-content"} id='chat-content' className='chat-content'>
            {messages.length === 0 && !isRefreshed.current && 
                <div className='chat-content__mock'>
                    <div className='chat-content__spinner'>
                    </div>
                </div>}
            {messages.length === 0 && isRefreshed.current &&
                <div className="chat-content__no-messages">
                    Сообщений нет
                </div>
            }
            {messages.map((message) => {
                const isSelected: boolean = selectedMessages.find((selectedMessage) => selectedMessage.message_id === message.message_id) !== undefined;

                return (
                    <Message message={message} key={message.message_id} isSelected={isSelected} />
                );
            })}
        </div>
    )
};

export default ChatContent;