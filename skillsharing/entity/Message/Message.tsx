import React from 'react';
import { IMessage } from './MessageTypes';
import './Message.scss';
import { useDispatch, useSelector } from 'react-redux';
import { showStructurizedModal, toggleSelectedMessage } from '../../app/slices/ChatSlice';
import { FormatHoursMinutes } from '../../shared/Functions/FormatDate';
import { AppState } from '../../app/AppStore';
import StructurizedMessageContent from '../../widgets/StructurizedMessageContent/StructurizedMessageContent';
import { Link } from 'react-router';
import { SECOND_IN_MILLISECONDS } from '../../shared/Consts/ValidatorsConts';
import { ATTACHMENTS_URL } from '../../shared/Consts/URLS';

interface PropType {
    message: IMessage;
    isSelected: boolean;
    isStructurizing: boolean;
}

const Message: React.FC<PropType> = ({ message, isSelected, isStructurizing }) => {
    const { user } = useSelector((state: AppState) => state.user);
    const user_id: IMessage['user_id'] = user!.id;
    const messageTime: string = FormatHoursMinutes(
        new Date(message.created_at * SECOND_IN_MILLISECONDS),
    );
    const isOwnMessage = user_id === message.user_id;
    const dispatch = useDispatch();

    return (
        <div
            className={
                'chat-message-field' +
                (isSelected ? ' chat-message-field_selected' : '') +
                (isOwnMessage ? ' chat-message-field_right' : '')
            }
            onClick={() => {
                if (window.getSelection()?.toString() !== '') {
                    return;
                }

                dispatch(toggleSelectedMessage(message.message_id));
            }}
        >
            <div
                className={
                    'chat-message-wrapper chat-message-wrapper_' + (isOwnMessage ? 'right' : 'left')
                }
            >
                <div
                    className={'chat-message chat-message_' + (isOwnMessage ? 'right' : 'left')}
                    key={message.message_id}
                >
                    <div className="chat-content__text">{message.payload}</div>
                    {message.structurized !== undefined && (
                        <>
                            <div className="chat-content-structured">
                                <StructurizedMessageContent message={message} isOnPage={false} />
                            </div>
                            <Link
                                className="chat-content-link"
                                to={`/structurized-messages/${message.message_id}`}
                                aria-label=""
                            >
                                <div className="chat-content-link__go-to-page">
                                    Перейти на отдельную страницу
                                </div>
                            </Link>
                        </>
                    )}
                    {message.attachments !== undefined && (
                        <div className="chat-content-message-attachments">
                            {message.attachments.map((attachment) => {
                                return (
                                    <div
                                        key={attachment}
                                        className="chat-content-message-attachments-item"
                                    >
                                        <a
                                            href={ATTACHMENTS_URL + attachment}
                                            download={attachment}
                                            aria-label="Скачать вложение"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                            }}
                                        >
                                            <img
                                                className="chat-content-message-attachments-item__img"
                                                src="/ChatPage/download.png"
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className="chat-content__time">
                        {isStructurizing && (
                            <div className="chat-content__structurizing">структуризируется</div>
                        )}
                        {message.updated_at !== message.created_at && (
                            <div className="chat-content__time_redacted">ред.</div>
                        )}
                        {messageTime}
                    </div>
                </div>
                {message.structurized === undefined &&
                    message.payload !== undefined &&
                    message.payload !== '' && (
                        <img
                            className="chat-message-wrapper__structurize-img"
                            src="/ChatPage/ai.png"
                            alt="Структуризировать"
                            title="Структуризировать сообщение"
                            onClick={(event) => {
                                dispatch(showStructurizedModal(message.message_id));

                                event.stopPropagation();
                            }}
                        />
                    )}
            </div>
            {isSelected && (
                <div
                    className={
                        'chat-message-checked-mark chat-message-checked-mark_' +
                        (isOwnMessage ? 'right' : 'left')
                    }
                >
                    <img
                        className="chat-message-checked-mark__img"
                        src="/ChatPage/selected.png"
                        alt="selected"
                    />
                </div>
            )}
        </div>
    );
};

export default Message;
