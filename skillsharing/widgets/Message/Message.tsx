import React from 'react'
import { MessageType } from './MessageTypes';
import './Message.scss'

interface PropType {
    message: MessageType,
}

const Message: React.FC<PropType> = ({message}) => {
    const user_id: number = +(localStorage.getItem('user_id') || 0);

    const messageTime: Date = new Date(message.time);
    console.log(messageTime)

    return (
        <div className={'chat-message chat-message_' + (user_id === message.user_id ? 'right' : 'left')} key={message.message_id}>
            <div className='chat-content__text'>
                {message.payload}
            </div>
            <div className='chat-content__time'>
                {messageTime.getHours()}:{messageTime.getMinutes()}
            </div>
        </div>
    )
};

export default Message;