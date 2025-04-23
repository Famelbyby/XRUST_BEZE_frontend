import React, { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedMessages, editMessage, hideDeletingModal, showDeletingModal, hideStructurizedModal, showStructurizedModal, addStructurizingMessage } from "../../app/slices/ChatSlice";
import { IDeletingMessage, IMessage, IStructurizeMessage } from "../../entity/Message/MessageTypes";
import { FormatRelativeTimeInPastInDays } from "../../shared/Functions/FormatDate";
import { AppDispatch, AppState } from "../../app/AppStore";
import './ChatHeader.scss'
import { AVATAR_URL } from "../../shared/Consts/URLS";
import MainWebSocket from '../../shared/WebSocket'
import { createPortal } from "react-dom";
import SkillsLine from '../../features/SkillsLine/SkillsLine'
import ModalWindow from '../../features/ModalWindow/ModalWindow'
import { setIsCopied } from "../../app/slices/UserSlice";

function handleDeletePressing(event: KeyboardEvent) {
    if (event.key !== 'Delete') {
        return;
    }

    const deleteButton = document.querySelector('#delete-messages') as HTMLElement;

    if (deleteButton !== null) {
        deleteButton.click();
    }
}

const ChatHeader: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector((state: AppState) => state.user);
    const {selectedMessages, channelID, companion, peerID, isHiddenDeletingModal, isHiddenStructurizedModal} = useSelector((state: AppState) => state.chatMessages);
    const selectedMessagesCount = (selectedMessages || []).length;

    useEffect(() => {
        if (companion !== undefined) {
            document.title = `Чат с ${companion.username}`;
        }
    }, [companion]);

    useEffect(() => {
        window.addEventListener('keydown', handleDeletePressing);

        return () => {
            window.removeEventListener('keydown', handleDeletePressing);
        }
    }, []);

    function handleDeletingMessage() {
        if (selectedMessages === undefined) {
            return;
        }

        selectedMessages.forEach((selectedMessage: IMessage) => {
            const messageJSON: IDeletingMessage = {
                "event": (selectedMessage.voice === undefined ? "EventText" : 'EventVoice'),
                "user_id": user!.id,
                "peer_id": peerID!,
                "channel_id": channelID,
                "type": "delete_message",
                "message_id": selectedMessage.message_id,
            }
    
            MainWebSocket.sendMessage(JSON.stringify(messageJSON));
        })
        
        dispatch(removeSelectedMessages());
    }

    function structurizeMessage(messageId: string) {
        const messageJSON: IStructurizeMessage = {
            "event": "EventStructurization",
            "message_id": messageId,
            "channel_id": channelID,
        }

        MainWebSocket.sendMessage(JSON.stringify(messageJSON));
        
        dispatch(removeSelectedMessages());
        dispatch(addStructurizingMessage(messageId));
    }

    let isMyMessages: boolean = true;

    if (selectedMessages !== undefined) {
        selectedMessages.forEach((selectedMessage) => {
            if (user !== undefined) {
                isMyMessages = isMyMessages && selectedMessage.user_id === user.id;
            }
        });
    }
    
    return (
        <div className='chat-header'>
            {selectedMessagesCount === 0 &&
                <>
                    <Link to={companion === undefined ? window.location.href : `/profile/${companion.id}`}>
                        <div className='chat-header-user'>
                            {companion && <img className='chat-header-user__avatar' src={AVATAR_URL + companion.avatar} alt='' />}
                            {(companion === undefined) && 
                                <div className="chat-header-user__avatar chat-header-user__avatar-mock">
                                    <div className="chat-header-spinner">
                                    </div>
                                </div>}
                            <div className='chat-header-user-info'>
                                {companion !== undefined && 
                                    <div className='chat-header-user__name'>
                                        {companion.username}
                                    </div>}
                                {(companion === undefined) && 
                                    <div className='chat-header-user__name-mock'>
                                        <div className="chat-header-spinner">
                                        </div>
                                    </div>}
                                {companion !== undefined && 
                                    <div className='chat-header-user__online'>
                                        {FormatRelativeTimeInPastInDays(new Date(companion.last_active_at))}
                                    </div>}
                                {(companion === undefined) && 
                                    <div className='chat-header-user__online-mock'>
                                        <div className="chat-header-spinner">
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </Link>
                    {companion !== undefined && 
                        <div className='chat-header-chat-info'>
                            <div className='chat-header-chat-info__tags'>
                                <SkillsLine skills={companion.skills_to_share} />
                            </div>
                            <div className='chat-header-chat-info__rating'>
                                Оценка 0
                            </div>
                        </div>
                    }
                </>
            }
            {selectedMessagesCount > 0 && 
                <>
                    <div className="chat-header-remove-selection">
                        <img className="chat-header-remove-selection__img" src="/ChatPage/cross.png" alt="Отменить выделение" onClick={() => dispatch(removeSelectedMessages())}/>
                        {selectedMessagesCount}
                    </div>
                    <div className="chat-header-controls">
                        {selectedMessages !== undefined && selectedMessagesCount === 1 &&
                            <>
                                <img className="chat-header-controls__img chat-header-controls__ai" src="/ChatPage/ai.png" alt="Структуризировать" title="Структуризировать сообщение" onClick={() => {
                                    dispatch(showStructurizedModal());
                                }}/>
                                {isMyMessages && selectedMessages[0].voice === undefined && 
                                    <img className="chat-header-controls__img chat-header-controls__edit" src="/shared/pen.png" alt="Изменить сообщение" onClick={() => {
                                        dispatch(editMessage());
                                    }}/>
                                }
                                <img className="chat-header-controls__img chat-header-controls__copy" src="/ChatPage/copy.png" alt="Копировать сообщение" onClick={() => {
                                    navigator.clipboard.writeText(selectedMessages[0].payload || '');

                                    dispatch(setIsCopied(true));
                                    dispatch(removeSelectedMessages());
                                }} />
                            </>   
                        }
                        {isMyMessages && 
                            <>
                                <img id='delete-messages' className="chat-header-controls__img chat-header-controls__delete" src="/ChatPage/delete.png" alt="Удалить сообщения" onClick={() => dispatch(showDeletingModal())} />
                                {!isHiddenDeletingModal && 
                                    createPortal(<ModalWindow modalType={'delete'} closeModal={() => dispatch(hideDeletingModal())} agreeTitle="Удалить" cancelTitle="Отменить" agreeFunc={handleDeletingMessage} windowTitle="Вы уверены, что хотите удалить выделенные сообщения?"/>, document.querySelector('#root')!)
                                }
                            </>
                        }
                        {!isHiddenStructurizedModal && 
                            createPortal(<ModalWindow modalType={'structurize'} closeModal={() => dispatch(hideStructurizedModal())} agreeTitle="Да" cancelTitle="Отменить" agreeFunc={() => structurizeMessage(selectedMessages![0].message_id)} windowTitle="Вы уверены, что хотите структуризировать выделенное сообщение? Это может занять несколько минут"/>, document.querySelector('#root')!)
                        }
                    </div>
                </>
            }
        </div>
    )
};

export default ChatHeader;