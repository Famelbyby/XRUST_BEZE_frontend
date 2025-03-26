import React, { useEffect, useState } from "react";
import { ISendingMessage, IUpdatingMessage } from "../../entity/Message/MessageTypes";
import MainWebSocket from '../../shared/WebSocket/WebSocket';
import { useDispatch, useSelector } from "react-redux";
import { ChatState } from "../../app/stores/ChatStore";
import { stopEditingMessage } from "../../entity/Message/slice/MessagesSlice";

const TEXTAREA_INITIAL_HEIGHT: number = 23;
const MESSAGE_MAX_LENGTH: number = 800;

interface ChatFooterPropTypes {
    companionID: string,
}

const userId: string = (localStorage.getItem('user_id') || '0');

function normalizeTextarea() {
    const textareaInput: HTMLElement | null = document.getElementById('textarea');

    if (textareaInput !== null) {
        textareaInput.style.height = `${TEXTAREA_INITIAL_HEIGHT}px`;
        textareaInput.style.height = textareaInput.scrollHeight + "px";
    }
}

const ChatFooter: React.FC<ChatFooterPropTypes> = ({companionID}) => {
    const [inputText, setInputText] = useState('');
    const {editingMessage, channelID} = useSelector((state: ChatState) => state.chatMessages);
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingMessage !== null) {
            setInputText(editingMessage.payload);
        }
    }, [editingMessage]);

    function handleSendingMessage() {
        if (inputText.trim() === '') {
            return;
        }

        let sendingText: string = inputText;

        while (sendingText.length > MESSAGE_MAX_LENGTH) {
            const messageJSON: ISendingMessage = {
                "event": "EventText",
                "user_id": userId,
                "peer_id": companionID,
                "channel_id": channelID,
                "payload": sendingText.slice(0, MESSAGE_MAX_LENGTH),
                "type": "send_message",
            }
    
            MainWebSocket.sendMessage(JSON.stringify(messageJSON));

            sendingText = sendingText.slice(MESSAGE_MAX_LENGTH);
        }

        const messageJSON: ISendingMessage = {
            "event": "EventText",
            "user_id": userId,
            "peer_id": companionID,
            "channel_id": channelID,
            "payload": sendingText,
            "type": "send_message",
        }

        MainWebSocket.sendMessage(JSON.stringify(messageJSON));

        setInputText('');
        normalizeTextarea();
    }

    function handleUpdatingMessage() {
        if (inputText.trim() === '') {
            dispatch(stopEditingMessage());
            return;
        }

        const messageJSON: IUpdatingMessage = {
            "event": "EventText",
            "user_id": userId,
            "peer_id": companionID,
            "channel_id": channelID,
            "payload": inputText,
            "type": "update_message",
            "message_id": editingMessage!.message_id,
        }

        MainWebSocket.sendMessage(JSON.stringify(messageJSON));

        setInputText('');
        normalizeTextarea();
        dispatch(stopEditingMessage());
    }

    function handleChangingTextareaInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();

        const textAreaInput: HTMLTextAreaElement = event.target;

        if (editingMessage !== null && textAreaInput.value.length === 800) {
            return;
        }

        normalizeTextarea();

        setInputText(textAreaInput.value);
    }

    useEffect(() => {
        normalizeTextarea();
    });

    return (
        <div className='chat-footer'>
            <div className='chat-footer-fields'>
                <img className='chat-footer-fields__microphone' src='/Chat/microphone.png' alt='record-voice-message' />
                <textarea id="textarea" className='chat-footer-fields__textarea' value={inputText} placeholder='Ваше сообщение...' onChange={handleChangingTextareaInput}/>
            </div>
            <div className='chat-footer-controls'>
                <img className='chat-footer-controls__attach-file' src='/shared/plus.png' alt='attach-file'/>
                {editingMessage === null && 
                    <img id="send-message" className='chat-footer-controls__send-message' src='/Chat/send.png' alt='send-message' onClick={handleSendingMessage}/>
                }
                {editingMessage !== null &&
                    <img id="update-message" className='chat-footer-controls__update-message' src='/Chat/check.png' alt='update-message' onClick={handleUpdatingMessage}/>
                }
            </div>
        </div>
    );
};

export default ChatFooter;