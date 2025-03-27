import React from 'react'
import { IMessage } from './MessageTypes';
import './Message.scss'
import { useDispatch } from 'react-redux';
import {toggleSelectedMessage} from '../../pages/Chat/ui/slice/ChatSlice'
import { FormatHoursMinutes } from '../../shared/Functions/FormatDate';
import User from '../User/User';

interface PropType {
    message: IMessage,
    isSelected: boolean,
}

const Message: React.FC<PropType> = ({message, isSelected}) => {
    const user_id: IMessage["user_id"] = User.getUserID();
    const messageTime: string = FormatHoursMinutes(new Date());
    const isOwnMessage = user_id === message.user_id;
    const dispatch = useDispatch();

    return (
        <div className={'chat-message-field' + (isSelected ? " chat-message-field_selected" : "") + (isOwnMessage ? ' chat-message-field_right' : '')} onClick={() => dispatch(toggleSelectedMessage(message.message_id))}>
            <div className={'chat-message chat-message_' + (isOwnMessage ? 'right' : 'left')} key={message.message_id}>
                <div className='chat-content__text'>
                    {message.payload}
                </div>
                <div className='chat-content__time'>
                    {message.updated_at !== message.created_at && 
                        <div className='chat-content__time_redacted'>
                            ред.
                        </div>
                    }
                    {messageTime}
                </div>
            </div>
            {isSelected && 
                <div className={'chat-message-checked-mark chat-message-checked-mark_' + (isOwnMessage ? 'right' : 'left')}>
                    <img className='chat-message-checked-mark__img' src='/Chat/selected.png' alt='selected' />
                </div>
            }
        </div>
    );
};

export default Message;