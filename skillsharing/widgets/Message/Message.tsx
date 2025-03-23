import React from 'react'
import { IMessage } from './MessageTypes';
import './Message.scss'
import { useDispatch } from 'react-redux';
import {toggleSelectedMessage} from './MessagesSlice'

interface PropType {
    message: IMessage,
    isSelected: boolean,
}

const Message: React.FC<PropType> = ({message, isSelected}) => {
    const user_id: IMessage["user_id"] = (localStorage.getItem('user_id') || "2");
    const messageTime: Date = new Date();
    const isOwnMessage = user_id === message.user_id;
    const dispatch = useDispatch();

    return (
        <div className={'chat-message-field' + (isSelected ? " chat-message-field_selected" : "")} onClick={() => dispatch(toggleSelectedMessage(message.message_id))}>
            <div className={'chat-message chat-message_' + (isOwnMessage ? 'right' : 'left')} key={message.message_id}>
                <div className='chat-content__text'>
                    {message.payload}
                </div>
                <div className='chat-content__time'>
                    {messageTime.getHours()}:{messageTime.getMinutes()}
                </div>
            </div>
        </div>
    );
};

export default Message;