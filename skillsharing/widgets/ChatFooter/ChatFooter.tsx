import React, { useEffect } from "react";
import { ISendingMessage, ISendingVoiceMessage, IUpdatingMessage } from "../../entity/Message/MessageTypes";
import { useDispatch, useSelector } from "react-redux";
import { stopEditingMessage } from "../../app/slices/ChatSlice";
import { AppDispatch, AppState } from "../../app/AppStore";
import {NormalizeTextarea} from '../../shared/Functions/FormatComponents'
import './ChatFooter.scss'
import MainWebSocket from '../../shared/WebSocket'
import { FormatMinutesSecondDuration } from "../../shared/Functions/FormatDate";
import { clearRecorded, setIsPlayingRecord, setPlayerSource, setRecorded, startRecording, stopPlaying } from "../../app/slices/RecorderSlice";
import { LoadAttachments, LoadVoiceRecord } from "../../pages/Chat/api/Chat";
import { addAttachment, clearInputAndAttachments, clearUpdate, setInputText, setOldAttachments, setUpdate } from "../../app/slices/ManageMessageSlice";

const TEXTAREA_INITIAL_HEIGHT = 15;
const MESSAGE_MAX_LENGTH = 800;

let mediaRecorder: undefined | MediaRecorder;

function handleEnter(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
        return;
    }

    event.preventDefault();

    const sendMessageButton: HTMLButtonElement | null = document.querySelector('#send-message');

    if (sendMessageButton !== null) {
        sendMessageButton.click();
    }
}

const ChatFooter: React.FC = () => {
    const {editingMessage, channelID, peerID} = useSelector((state: AppState) => state.chatMessages);
    const {isRecorded, recordDuration, isPlayingRecord, isRecording, voiceBlob, recordURL} = useSelector((state: AppState) => state.recorder);
    const {isUpdating, attachmentURLs, attachments, attachmentsUploaded, inputText, oldAttachments} = useSelector((state: AppState) => state.manageMessage);
    const {user} = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const userId: string = user!.id;
    
    useEffect(() => {
        window.addEventListener('keypress', handleEnter);

        return () => {
            window.removeEventListener('keypress', handleEnter);
        }
    }, []);

    /**
     * Adds eventListener on 'Enter' to send messages or confirm editing
     */
    useEffect(() => {
        const recorder = document.querySelector('#record-voice-message') as HTMLElement;

        async function toggleRecordingVoiceMessage() {
            if (!isRecording) {
                const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
                mediaRecorder = new MediaRecorder(mediaStream);
                mediaRecorder.start();

                dispatch(startRecording());
            } else {
                if (mediaRecorder !== undefined) {
                    mediaRecorder.stop();

                    mediaRecorder.ondataavailable = (event: BlobEvent) => {
                        const blobchik = new Blob([event.data], {type: 'audio/mp3'});

                        dispatch(setRecorded(blobchik));
                    };

                    mediaRecorder = undefined;
                }
            }
        }

        if (recorder !== null) {
            recorder.addEventListener('click', toggleRecordingVoiceMessage);
        }

        return () => {
            if (recorder !== null) {
                recorder.removeEventListener('click', toggleRecordingVoiceMessage);
            }
        }
    }, [dispatch, isRecording]);

    useEffect(() => {
        if (voiceBlob !== undefined) {
            dispatch(setPlayerSource(URL.createObjectURL(voiceBlob)));
        }
    }, [voiceBlob, dispatch]);

    useEffect(() => {
        if (editingMessage !== null) {
            dispatch(setInputText(editingMessage.payload || ''));
            dispatch(setOldAttachments(editingMessage.attachments || []));
            dispatch(setUpdate());
        }
    }, [editingMessage, dispatch]);

    function handleSending() {
        if (isRecorded && voiceBlob) {
            dispatch(LoadVoiceRecord(voiceBlob));
        } else {
            dispatch(LoadAttachments(attachments));
        }

        const chatContent = document.querySelector('.chat-content');

        if (chatContent !== null) {
            chatContent.scrollTo(0, 0);
        }
    }
    useEffect(() => {
        if (recordURL !== undefined) {
            const messageJSON: ISendingVoiceMessage = {
                "event": "EventVoice",
                "user_id": userId,
                "peer_id": peerID!,
                "channel_id": channelID,
                "payload": '',
                "type": "send_message",
                "voice": recordURL,
                "voice_duration": recordDuration,
            }
    
            MainWebSocket.sendMessage(JSON.stringify(messageJSON));
    
            dispatch(clearRecorded());
        }
    }, [recordURL, dispatch, peerID, userId, channelID, recordDuration]);

    useEffect(() => {
        if (!attachmentsUploaded) {
            return;
        }

        if (!isUpdating) {
            if (inputText.trim() === '' && attachments.length === 0) {
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
        
                MainWebSocket.sendMessage(JSON.stringify(messageJSON));

                sendingText = sendingText.slice(MESSAGE_MAX_LENGTH);
            }

            const messageJSON: ISendingMessage = {
                "event": "EventText",
                "user_id": userId,
                "peer_id": peerID!,
                "channel_id": channelID,
                "payload": sendingText,
                "type": "send_message",
                "attachments": attachmentURLs,
            }

            MainWebSocket.sendMessage(JSON.stringify(messageJSON));

            dispatch(clearInputAndAttachments());
            NormalizeTextarea('textarea', TEXTAREA_INITIAL_HEIGHT);
        } else {
            if (inputText.trim() === '' && attachments.length === 0 && oldAttachments.length === 0) {
                dispatch(stopEditingMessage());
                dispatch(clearInputAndAttachments());
                dispatch(clearUpdate());
                return;
            }
    
            const messageJSON: IUpdatingMessage = {
                "event": "EventText",
                "user_id": userId,
                "peer_id": peerID!,
                "channel_id": channelID,
                "payload": inputText,
                "type": "update_message",
                "created_at": editingMessage!.created_at,
                "message_id": editingMessage!.message_id,
                "attachments": [...oldAttachments, ...attachmentURLs!],
            }
    
            MainWebSocket.sendMessage(JSON.stringify(messageJSON));
    
            dispatch(clearInputAndAttachments());
            dispatch(clearUpdate());
            NormalizeTextarea('textarea', TEXTAREA_INITIAL_HEIGHT);
            dispatch(stopEditingMessage());
        }
    }, [dispatch, channelID, inputText, peerID, userId, attachmentsUploaded, attachmentURLs, attachments.length, isUpdating, editingMessage]);

    function handleChangingTextareaInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();

        const textAreaInput: HTMLTextAreaElement = event.target;

        if (editingMessage !== null && textAreaInput.value.length === 800) {
            return;
        }

        NormalizeTextarea('textarea', TEXTAREA_INITIAL_HEIGHT);
        dispatch(setInputText(textAreaInput.value));
    }

    useEffect(() => {
        NormalizeTextarea('textarea', TEXTAREA_INITIAL_HEIGHT);
    });

    useEffect(() => {
        let deleteIndex: undefined | number;
        const sidebar = document.getElementById('recorded-voice-message') as HTMLElement;

        if (isPlayingRecord) {
            deleteIndex = setInterval(() => {

                if (sidebar !== null) {
                    const player = document.getElementById('voice-messages-recorder') as HTMLMediaElement;
                    const percentage = player.currentTime / player.duration * 100;

                    if (percentage === 100) {
                        dispatch(stopPlaying());
                    }
                }
            }, 50);
        }

        return () => {
            clearInterval(deleteIndex);
        }
    }, [isPlayingRecord, dispatch]);

    function handleAddingAttachment(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files !== null) {
            Array.from(files).forEach(newFile => {
                dispatch(addAttachment(newFile));
            });
        }

        event.target.value = '';
    }

    return (
        <div className='chat-footer'>
            {isUpdating && 
                <div className="chat-footer-stop-updating">
                    <img className="chat-footer-stop-updating__img" src="/shared/cancel_black.png" alt="Отменить редактирование" onClick={() => {
                        dispatch(stopEditingMessage());
                        dispatch(clearInputAndAttachments());
                        dispatch(clearUpdate());
                    }}/>
                </div>
            }
            <div className='chat-footer-fields'>
                {isRecording && 
                    <div className="chat-footer-fields__microphone-background">
                    </div>
                }
                <img id='record-voice-message' className={'chat-footer-fields__microphone' + (isRecording ? " chat-footer-fields__microphone_recording" : '')} src={'/ChatPage/microphone' + (isRecording ? "_white" : "") + '.png'} alt='Записать голосовое сообщение' />
                {!isRecorded && 
                    <textarea id="textarea" className='chat-footer-fields__textarea' value={inputText} placeholder='Ваше сообщение...' onChange={handleChangingTextareaInput}/>
                }
                {isRecorded && 
                    <div id="recorded-voice-message" className="chat-footer-recorded-voice-message">
                        {!isPlayingRecord &&  
                            <img className="chat-footer-recorded-voice-message__toggler" src='/shared/play-button_white.png' alt="Включить" onClick={() => {
                                dispatch(setIsPlayingRecord(true));
                            }}/>
                        }
                        {isPlayingRecord &&  
                            <img className="chat-footer-recorded-voice-message__toggler" src='/shared/pause_white.png' alt="Выключить" onClick={() => {
                                dispatch(setIsPlayingRecord(false));
                            }}/>
                        }
                        <div id="recorder-duration" className="chat-footer-recorded-voice-message__duration">
                            {FormatMinutesSecondDuration(recordDuration)}
                        </div>
                    </div>
                }
            </div>
            <div className='chat-footer-controls'>
                {!isRecorded && 
                    <>
                        <img className='chat-footer-controls__attach-file' src='/shared/plus.png' alt='Прикрепить файл' onClick={() => {
                            const attachmentsInput = document.getElementById('attachments-input') as HTMLElement;

                            if (attachmentsInput !== null) {
                                attachmentsInput.click();
                            }
                        }} />
                        <input id="attachments-input" type="file" className="chat-footer-controls__attachments-input" multiple onChange={handleAddingAttachment}/>
                    </>
                }
                {isRecorded && 
                    <img className='chat-footer-controls__delete-recording' src='/shared/cancel.png' alt='Удалить запись' onClick={() => {
                        dispatch(clearRecorded());
                    }}/>
                }
                {editingMessage === null && 
                    <img id="send-message" className='chat-footer-controls__send-message' src='/ChatPage/send.png' alt='send-message' onClick={handleSending}/>
                }
                {editingMessage !== null &&
                    <img id="update-message" className='chat-footer-controls__update-message' src='/ChatPage/check.png' alt='update-message' onClick={handleSending}/>
                }
            </div>
            <div className="chat-footer-scrolldown">
                <img className="chat-footer-scrolldown__button" src="/ChatPage/down-arrow.png" alt="Scroll to bottom" />
            </div>
        </div>
    );
};

export default ChatFooter;