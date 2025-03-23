import React, { useState } from "react";
import { ISendingMessage } from "../../../../widgets/Message/MessageTypes";
import MainWebSocket from '../../../../shared/WebSocket/WebSocket';

interface ChatFooterPropTypes {
    companionID: string,
}

const ChatFooter: React.FC<ChatFooterPropTypes> = ({companionID}) => {
    const [inputText, setInputText] = useState('');

    function handleSendingMessage() {
        if (inputText.trim() === '') {
            return;
        }

        const userId: string = (localStorage.getItem('user_id') || '0');

        const messageJSON: ISendingMessage = {
            "event": "EventText",
            "user_id": String(userId),
            "channel_id": companionID,
            "payload": inputText,
            "type": "send_message",
        }

        MainWebSocket.sendMessage(JSON.stringify(messageJSON));

        setInputText('');
    }

    return (
        <div className='chat-footer'>
            <div className='chat-footer-fields'>
                <img className='chat-footer-fields__microphone' src='/Chat/microphone.png' alt='record-voice-message' />
                <input type='text' className='chat-footer-fields__input' value={inputText} placeholder='Ваше сообщение...' onChange={(event) => {
                    event.preventDefault();

                    setInputText(event.target.value);
                }}/>
            </div>
            <div className='chat-footer-controls'>
                <img className='chat-footer-controls__attach-file' src='/Chat/plus.png' alt='attach-file'/>
                <img id="send-message" className='chat-footer-controls__send-message' src='/Chat/send.png' alt='send-message' onClick={handleSendingMessage}/>
            </div>
        </div>
    );
};

export default ChatFooter;