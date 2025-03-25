import React from 'react'
import { IMessage } from './MessageTypes';
import './Message.scss'
import { useDispatch } from 'react-redux';
import {toggleSelectedMessage} from './slice/MessagesSlice'
import { FormatHoursMinutes } from '../../shared/Functions/FormatDate';

interface PropType {
    message: IMessage,
    isSelected: boolean,
}

const Message: React.FC<PropType> = ({message, isSelected}) => {
    const user_id: IMessage["user_id"] = (localStorage.getItem('user_id') || "2");
    const messageTime: string = FormatHoursMinutes(new Date());
    const isOwnMessage = user_id === message.user_id;
    const dispatch = useDispatch();

    return (
        <div className={'chat-message-field' + (isSelected ? " chat-message-field_selected" : "")} onClick={() => dispatch(toggleSelectedMessage(message.message_id))}>
            <div className={'chat-message chat-message_' + (isOwnMessage ? 'right' : 'left')} key={message.message_id}>
                <div className='chat-content__text'>
                    {message.payload}
                </div>
                <div className='chat-content__time'>
                    {message.updatedAt !== message.createdAt && 
                        <div className='chat-content__time_redacted'>
                            ред.
                        </div>
                    }
                    {messageTime}
                </div>
            </div>
        </div>
    );
};

export default Message;