import React, { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../entity/Message/Message"
import { IMessage } from "../../entity/Message/MessageTypes";
import { GetChatMessages } from "../../pages/Chat/api/Chat";
import { addMessage, replaceMessages, deleteMessage, updateMessage, clearAllMessages } from "../../app/slices/ChatSlice";
import { AppDispatch, AppState } from "../../app/AppStore";
import './ChatContent.scss'
import { DAY_IN_MILLISECONDS } from "../../shared/Consts/ValidatorsConts";
import { FormatDayMonthYear } from "../../shared/Functions/FormatDate";
import MainWebSocket from '../../shared/WebSocket'

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
        MainWebSocket.addObserver('chat-messages', (data: string) => {
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
        });

        return () => {
            MainWebSocket.removeObserver('chat-messages');
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

    useEffect(() => {
        const chatContent = document.querySelector('.chat-content');
        const scrollDown = document.querySelector('.chat-footer-scrolldown') as HTMLElement;

        if (chatContent !== null && scrollDown !== null) {
            chatContent.addEventListener('scroll', () => {
                if (chatContent.scrollTop < -100) {
                    scrollDown.style.display = "block";
                } else {
                    scrollDown.style.display = "none";
                }
            });

            scrollDown.addEventListener('click', () => {
                chatContent.scrollTo(0, 0);
            });
        }
    }, []);

    return (
        <div id='chat-content' className='chat-content'>
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
            {messages !== undefined && messages.length > 0 && messages.map((message, index) => {
                const isSelected: boolean = selectedMessages!.find((selectedMessage) => selectedMessage.message_id === message.message_id) !== undefined;
                
                let needTime: boolean = false;
                if (index === messages.length - 1 || messages[index + 1].created_at - message.created_at > (DAY_IN_MILLISECONDS / 1000)) {
                    needTime = true;
                }

                return (
                    <>
                        <Message message={message} key={(new Date()).getMilliseconds()} isSelected={isSelected} />
                        {needTime && 
                            <div className="chat-content-day-field" key={message.message_id}>
                                <div className="chat-content-day-field__day">
                                    {FormatDayMonthYear(new Date(message.created_at * 1000))}
                                </div>
                            </div>
                        }
                    </>
                );
            })}
        </div>
    )
};

export default ChatContent;