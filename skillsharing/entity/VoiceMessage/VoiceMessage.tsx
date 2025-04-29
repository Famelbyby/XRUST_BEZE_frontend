import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/AppStore";
import { IMessage } from "../Message/MessageTypes";
import { FormatHoursMinutes, FormatMinutesSecondDuration } from "../../shared/Functions/FormatDate";
import { toggleSelectedMessage } from "../../app/slices/ChatSlice";
import { SECOND_IN_MILLISECONDS } from "../../shared/Consts/ValidatorsConts";
import './VoiceMessage.scss'
import { finishVoiceMessage, setCurrentTime, setIsPLayingVoiceMessage, setPlayMessage } from "../../app/slices/RecorderSlice";
import RangeBar from "../../features/RangeBar/RangeBar";

interface PropType {
    message: IMessage,
    isSelected: boolean,
    isStructurizing: boolean,
}

const VoiceMessage: React.FC<PropType> = ({message, isSelected}) => {
    const {user} = useSelector((state: AppState) => state.user);
    const {voiceMessageId, isPlayingMessage, currentTime} = useSelector((state: AppState) => state.recorder);
    const user_id: IMessage["user_id"] = user!.id;
    const messageTime: string = FormatHoursMinutes(new Date(message.created_at * SECOND_IN_MILLISECONDS));
    const isOwnMessage = user_id === message.user_id;
    const dispatch = useDispatch();
    const player = document.getElementById('voice-messages-recorder') as HTMLMediaElement;

    useEffect(() => {
        let deleteIndex: undefined | number;

        if (isPlayingMessage && message.message_id === voiceMessageId) {
            const messageTimer = document.getElementById(`voice-message-${message.message_id}-duration`) as HTMLElement;
            const messageRangeBar = document.getElementById(`voice-range-bar-${message.message_id}`) as HTMLInputElement;

            deleteIndex = setInterval(() => {
                const percentage = player.currentTime / message.voice_duration! * 100000;

                if (messageTimer !== null) {
                    messageTimer.innerHTML = FormatMinutesSecondDuration(player.currentTime * SECOND_IN_MILLISECONDS);
                }

                if (messageRangeBar !== null) {
                    messageRangeBar.style.backgroundSize = `${percentage}% 100%`;
                    messageRangeBar.value = String(percentage);
                }
            }, 50);
        }

        return () => {
            clearInterval(deleteIndex);
        }
    }, [message.message_id, isPlayingMessage, voiceMessageId, dispatch, message.voice_duration]);

    useEffect(() => {
        if (!isPlayingMessage && voiceMessageId === message.message_id) {
            const messageTimer = document.getElementById(`voice-message-${message.message_id}-duration`) as HTMLElement;

            if (messageTimer !== null) {
                messageTimer.innerHTML = FormatMinutesSecondDuration(player.currentTime * SECOND_IN_MILLISECONDS);
            }
        }
    }, [isPlayingMessage, voiceMessageId]);

    useEffect(() => {
        player.onended = () => {
            dispatch(finishVoiceMessage());
        }
    }, [player, dispatch]);

    return (
        <div className={'chat-message-field' + (isSelected ? " chat-message-field_selected" : "") + (isOwnMessage ? ' chat-message-field_right' : '')} onClick={() => {
            if (window.getSelection()?.toString() !== '') {
                return;
            }

            dispatch(toggleSelectedMessage(message.message_id));
        }}>
            <div className={'chat-message-wrapper chat-message-wrapper_' + (isOwnMessage ? 'right' : 'left')}>
                <div id={`voice-message-content-${message.message_id}`} className={'chat-voice-message chat-voice-message_' + (isOwnMessage ? 'right' : 'left')} key={message.message_id}>
                    <div className="chat-voice-message-content">
                        <img className="chat-voice-message-content__img" src={"/shared/" + (isPlayingMessage && (voiceMessageId === message.message_id) ? "pause" : "play-button") + "_white.png"} alt="Включить голосовое" onClick={(event) => {
                            event.stopPropagation();

                            if (voiceMessageId !== message.message_id) {
                                dispatch(setPlayMessage({id: message.message_id, src: message.voice || '', duration: message.voice_duration || 0}));
                            } else {
                                dispatch(setIsPLayingVoiceMessage(!isPlayingMessage));
                            }
                        }}/>
                        {voiceMessageId === message.message_id && 
                            <RangeBar id={`voice-range-bar-${message.message_id}`} rangeClassName='voice-range-bar' min={0} max={100} step={1} value={player.currentTime / message.voice_duration! * 100 * SECOND_IN_MILLISECONDS} changeFunc={(event) => {
                                dispatch(setCurrentTime(event.target.value));
                            }}/>
                        }
                        <div className="chat-voice-message-content__duration" id={`voice-message-${message.message_id}-duration`}>
                            {voiceMessageId === message.message_id && 
                                <>
                                    {FormatMinutesSecondDuration(currentTime)}
                                </>
                            }
                            {voiceMessageId !== message.message_id && 
                                <>
                                    {FormatMinutesSecondDuration(message.voice_duration!)}
                                </>
                            }
                        </div>
                    </div>
                    <div className='chat-content__time'>
                        {messageTime}
                    </div>
                </div>
                {/* {message.structurized === undefined && 
                    <img className="chat-message-wrapper__structurize-img" src="/ChatPage/ai.png" alt="Структуризировать" title="Структуризировать сообщение" onClick={(event) => {
                        dispatch(showStructurizedModal(message.message_id));

                        event.stopPropagation();
                    }}/>
                } */}
            </div>
            {isSelected && 
                <div className={'chat-message-checked-mark chat-message-checked-mark_' + (isOwnMessage ? 'right' : 'left')}>
                    <img className='chat-message-checked-mark__img' src='/ChatPage/selected.png' alt='selected' />
                </div>
            }
        </div>
    );
};

export default VoiceMessage;