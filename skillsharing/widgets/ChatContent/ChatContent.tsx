import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../entity/Message/Message"
import { IMessage } from "../../entity/Message/MessageTypes";
import { addMessage, deleteMessage, updateMessage } from "../../app/slices/ChatSlice";
import { AppDispatch, AppState } from "../../app/AppStore";
import './ChatContent.scss'
import { FormatDayMonthYear } from "../../shared/Functions/FormatDate";
import MainWebSocket from '../../shared/WebSocket'
import { DAY_IN_MILLISECONDS } from "../../shared/Consts/ValidatorsConts";

const ChatContent: React.FC = () => {
    const {messages, selectedMessages, structurizingMessages} = useSelector((state: AppState) => state.chatMessages);
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
                const isStructurizing: boolean = structurizingMessages.includes(message.message_id);
                
                let needTime: boolean = false;

                const messTime = new Date(message.created_at * 1000);

                if (index === messages.length - 1) {
                    needTime = true;
                } else {
                        const nextMessTime = new Date(messages[index + 1].created_at * 1000);
                        
                        if (!(nextMessTime.getDate() == messTime.getDate() && (nextMessTime.getMilliseconds() - messTime.getMilliseconds() < DAY_IN_MILLISECONDS))) {
                            needTime = true;
                        }
                }

                return (
                    <>
                        <Message isStructurizing={isStructurizing} message={message} key={(new Date()).getMilliseconds()} isSelected={isSelected} />
                        {needTime && 
                            <div className="chat-content-day-field" key={message.message_id}>
                                <div className="chat-content-day-field__day">
                                    {FormatDayMonthYear(messTime)}
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