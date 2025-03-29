import React, { useEffect, useState } from "react";
import { ISendingMessage, IUpdatingMessage } from "../../entity/Message/MessageTypes";
import { useDispatch, useSelector } from "react-redux";
import { stopEditingMessage } from "../../app/slices/ChatSlice";
import { AppState } from "../../app/AppStore";
import { sendMessage } from "../../app/slices/WebSocketSlice";
import {NormalizeTextarea} from '../../shared/Functions/FormatComponents'
import './ChatFooter.scss'

const TEXTAREA_INITIAL_HEIGHT: number = 23;
const MESSAGE_MAX_LENGTH: number = 800;

function handleEnter(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
        return;
    }

    const sendMessageButton: HTMLButtonElement | null = document.querySelector('#send-message');

    if (sendMessageButton !== null) {
        sendMessageButton.click();
    }
}

interface ChatFooterPropTypes {
    peerID: string | undefined,
}

const ChatFooter: React.FC<ChatFooterPropTypes> = ({peerID}) => {
    const [inputText, setInputText] = useState('');
    const {editingMessage, channelID} = useSelector((state: AppState) => state.chatMessages);
    const {user} = useSelector((state: AppState) => state.profile);
    const dispatch = useDispatch();
    const userId: string = user!.id;
    
    /**
     * Adds eventListener on 'Enter' to send messages or confirm editing
     */
    useEffect(() => {
        window.addEventListener('keypress', handleEnter);

        return () => {
            window.removeEventListener('keypress', handleEnter);
        }
    }, []);

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
                "peer_id": peerID!,
                "channel_id": channelID,
                "payload": sendingText.slice(0, MESSAGE_MAX_LENGTH),
                "type": "send_message",
            }
    
            dispatch(sendMessage(JSON.stringify(messageJSON)));

            sendingText = sendingText.slice(MESSAGE_MAX_LENGTH);
        }

        const messageJSON: ISendingMessage = {
            "event": "EventText",
            "user_id": userId,
            "peer_id": peerID!,
            "channel_id": channelID,
            "payload": sendingText,
            "type": "send_message",
        }

        dispatch(sendMessage(JSON.stringify(messageJSON)));

        setInputText('');
        NormalizeTextarea('textarea', TEXTAREA_INITIAL_HEIGHT);
    }

    function handleUpdatingMessage() {
        if (inputText.trim() === '') {
            dispatch(stopEditingMessage());
            return;
        }

        const messageJSON: IUpdatingMessage = {
            "event": "EventText",
            "user_id": userId,
            "peer_id": peerID!,
            "channel_id": channelID,
            "payload": inputText,
            "type": "update_message",
            "message_id": editingMessage!.message_id,
        }

        dispatch(sendMessage(JSON.stringify(messageJSON)));

        setInputText('');
        NormalizeTextarea('textarea', TEXTAREA_INITIAL_HEIGHT);
        dispatch(stopEditingMessage());
    }

    function handleChangingTextareaInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();

        const textAreaInput: HTMLTextAreaElement = event.target;

        if (editingMessage !== null && textAreaInput.value.length === 800) {
            return;
        }

        NormalizeTextarea('textarea', TEXTAREA_INITIAL_HEIGHT);

        setInputText(textAreaInput.value);
    }

    useEffect(() => {
        NormalizeTextarea('textarea', TEXTAREA_INITIAL_HEIGHT);
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