import React, { useEffect, useState } from 'react';
import './Chat.scss'
import MainWebSocket from '../../../shared/WebSocket/WebSocket'
import {MessageType, SendingMessageType} from '../../../widgets/Message/MessageTypes'
import Message from '../../../widgets/Message/Message'

const initialMessages: Array<MessageType> = [
    {
        message_id: 1,
        event: "EventText",
        channel_id: 1,
        user_id: 1,
        payload: "Добрый день, Shkaf! Видел Вашу анкету, ваши познания в CS:GO и Dota 2 меня поразили, не могли бы Вы рассказать как занимать банан на Инферно и коннектор на Мираже?",
        seen: false,
        time: 1231231,
    },
    {
        message_id: 2,
        event: "EventText",
        channel_id: 1,
        user_id: 0,
        payload: "Приветствую! Да, с превеликим удовольствием. Сейчас составлю Вам план (с помощью встроенной функции)",
        seen: false,
        time: 1231231,
    },
]

const Chat: React.FC = () => {
    const [inputText, setText] = useState('');
    const [messages, setMessages] = useState(initialMessages);

    MainWebSocket.addObserver((data: string) => {
        handleReceivingMessage(data);
    });

    function handleReceivingMessage(data: string) {
        const message: MessageType = JSON.parse(data);
        console.log(message); 

        setMessages([message].concat(messages));
    }

    function handleSendingMessage() {
        const user_id: number = +(localStorage.getItem('user_id') || '0');

        const messageJSON: SendingMessageType = {
            "event": "EventText",
            "user_id": user_id,
            "channel_id": 1,
            "payload": inputText,
        }

        MainWebSocket.sendMessage(JSON.stringify(messageJSON));
        setText('');
    }

    return (
        <div className='chat-page'>
            <div className='chat-dialog'>
                <div className='chat-header'>
                    <div className='chat-header-user'>
                        <img className='chat-header-user__avatar' src='/Chat/mate.png' alt='' />
                        <div className='chat-header-user-info'>
                            <div className='chat-header-user__name'>
                                Michael Portman
                            </div>
                            <div className='chat-header-user__online'>
                                Online
                            </div>
                        </div>
                    </div>
                    <div className='chat-header-chat-info'>
                        <div className='chat-header-chat-info__tags'>
                            CS:GO Dota2
                        </div>
                        <div className='chat-header-chat-info__rating'>
                            Оценка 4.8
                        </div>
                    </div>
                </div>
                <div className='chat-content'>
                    {messages.map((message) => {
                        return (
                            <Message message={message} key={message.message_id}/>
                        )
                    })}
                </div>
                <div className='chat-footer'>
                    <div className='chat-footer-fields'>
                        <img className='chat-footer-fields__microphone' src='/Chat/microphone.png' alt='record-voice-message' />
                        <input type='text' className='chat-footer-fields__input' value={inputText} placeholder='Ваше сообщение...' onChange={(event) => {
                            event.preventDefault();
                            setText(event.target.value);
                        }}/>
                    </div>
                    <div className='chat-footer-controls'>
                        <img className='chat-footer-controls__attach-file' src='/Chat/plus.png' alt='attach-file'/>
                        <img className='chat-footer-controls__send-message' src='/Chat/send.png' alt='send-message' onClick={handleSendingMessage}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Chat;