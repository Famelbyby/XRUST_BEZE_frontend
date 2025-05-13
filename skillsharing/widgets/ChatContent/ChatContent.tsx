import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../entity/Message/Message';
import VoiceMessage from '../../entity/VoiceMessage/VoiceMessage';
import { IMessage } from '../../entity/Message/MessageTypes';
import {
    addMessage,
    deleteMessage,
    messageRecognized,
    updateMessage,
} from '../../app/slices/ChatSlice';
import { AppDispatch, AppState } from '../../app/AppStore';
import './ChatContent.scss';
import { FormatDayMonthYear } from '../../shared/Functions/FormatDate';
import MainWebSocket from '../../shared/WebSocket';
import { DAY_IN_MILLISECONDS, SECOND_IN_MILLISECONDS } from '../../shared/Consts/ValidatorsConts';
import { deleteAttachment } from '../../app/slices/ManageMessageSlice';
import { RoundSize } from '../../shared/Functions/FormatStrings';

const ChatContent: React.FC = () => {
    const { messages, selectedMessages, structurizingMessages } = useSelector(
        (state: AppState) => state.chatMessages,
    );
    const { attachments, oldAttachments } = useSelector((state: AppState) => state.manageMessage);
    const dispatch = useDispatch<AppDispatch>();
    const decryptedMessages = useRef(new Set<string>());

    /**
     * Adds messages movement in chat
     */
    useEffect(() => {
        MainWebSocket.addObserver('chat-messages', (data: string) => {
            const message: IMessage = JSON.parse(data);

            switch (message.type) {
                case 'send_message':
                    if (message.event === 'EventVoiceRecognized') {
                        dispatch(messageRecognized(message));
                    } else {
                        dispatch(addMessage(message));
                    }

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
                    scrollDown.style.display = 'block';
                } else {
                    scrollDown.style.display = 'none';
                }
            });

            scrollDown.addEventListener('click', () => {
                chatContent.scrollTo(0, 0);
            });
        }
    }, []);

    function encryptVoiceMessage(voiceMessageId: string) {
        decryptedMessages.current.delete(voiceMessageId);
    }

    function decryptVoiceMessage(voiceMessageId: string) {
        decryptedMessages.current.add(voiceMessageId);
    }

    return (
        <div id="chat-content" className="chat-content">
            {oldAttachments.length + attachments.length !== 0 && (
                <div className="chat-content-attachments">
                    {attachments.map((attachment, index) => {
                        return (
                            <div className="chat-content-attachments-item">
                                <img
                                    className="chat-content-attachments-item__img"
                                    src="/ChatPage/download.png"
                                    alt=""
                                />
                                <div className="chat-content-attachments-item__size">
                                    {RoundSize(attachment.size)}
                                </div>
                                <img
                                    className="chat-content-attachments-item__delete"
                                    src="/shared/cancel_black.png"
                                    alt=""
                                    onClick={() => {
                                        dispatch(deleteAttachment(index));
                                    }}
                                />
                            </div>
                        );
                    })}
                    {oldAttachments.map((_, index) => {
                        return (
                            <div className="chat-content-attachments-item">
                                <img
                                    className="chat-content-attachments-item__img"
                                    src="/ChatPage/download.png"
                                    alt=""
                                />
                                <img
                                    className="chat-content-attachments-item__delete"
                                    src="/shared/cancel_black.png"
                                    alt=""
                                    onClick={() => {
                                        dispatch(deleteAttachment(index + attachments.length));
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
            {messages === undefined && (
                <div className="chat-content__mock">
                    <div className="chat-content__spinner"></div>
                </div>
            )}
            {messages !== undefined && messages.length === 0 && (
                <div className="chat-content__no-messages">Сообщений нет</div>
            )}
            {messages !== undefined &&
                messages.length > 0 &&
                messages.map((message, index) => {
                    const isSelected: boolean =
                        selectedMessages!.find(
                            (selectedMessage) => selectedMessage.message_id === message.message_id,
                        ) !== undefined;
                    const isStructurizing: boolean = structurizingMessages.includes(
                        message.message_id,
                    );

                    let needTime: boolean = false;

                    const messTime = new Date(message.created_at * SECOND_IN_MILLISECONDS);

                    if (index === messages.length - 1) {
                        needTime = true;
                    } else {
                        const nextMessTime = new Date(
                            messages[index + 1].created_at * SECOND_IN_MILLISECONDS,
                        );

                        if (
                            !(
                                nextMessTime.getDate() == messTime.getDate() &&
                                nextMessTime.getMilliseconds() - messTime.getMilliseconds() <
                                    DAY_IN_MILLISECONDS
                            )
                        ) {
                            needTime = true;
                        }
                    }

                    return (
                        <>
                            {message.voice !== undefined && (
                                <VoiceMessage
                                    isDecrypted={decryptedMessages.current.has(message.message_id)}
                                    encryptVoiceMessage={(voiceMessageId) =>
                                        encryptVoiceMessage(voiceMessageId)
                                    }
                                    decryptVoiceMessage={(voiceMessageId) =>
                                        decryptVoiceMessage(voiceMessageId)
                                    }
                                    isSelected={isSelected}
                                    message={message}
                                    key={new Date().getMilliseconds()}
                                    isStructurizing={isStructurizing}
                                />
                            )}
                            {message.voice === undefined && (
                                <Message
                                    isStructurizing={isStructurizing}
                                    message={message}
                                    key={new Date().getMilliseconds()}
                                    isSelected={isSelected}
                                />
                            )}
                            {needTime && (
                                <div className="chat-content-day-field" key={message.message_id}>
                                    <div className="chat-content-day-field__day">
                                        {FormatDayMonthYear(messTime)}
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })}
        </div>
    );
};

export default ChatContent;
