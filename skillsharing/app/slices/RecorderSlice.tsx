import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoadVoiceRecord } from '../../pages/Chat/api/Chat';
import { LoadVoiceRecordResponse } from '../../shared/Consts/Interfaces';
import { VOICE_URL } from '../../shared/Consts/URLS';
import { SECOND_IN_MILLISECONDS } from '../../shared/Consts/ValidatorsConts';

export interface RecorderState {
    isRecording: boolean;
    isRecorded: boolean;
    isPlayingRecord: boolean;
    isPlayingMessage: boolean;
    voiceMessageId: string | undefined;
    recordDuration: number;
    startRecordingTime: number | undefined;
    volume: number;
    speed: number;
    currentTime: number;
    recordURL: string | undefined;
    voiceBlob: Blob | undefined;
    voiceMessageDuration: number;
}

const initialState: RecorderState = {
    isRecording: false,
    isPlayingRecord: false,
    recordDuration: 0,
    startRecordingTime: undefined,
    isRecorded: false,
    isPlayingMessage: false,
    voiceMessageId: undefined,
    volume: +(localStorage.getItem('voice-volume') || '0.5'),
    speed: +(localStorage.getItem('voice-speed') || '1'),
    recordURL: undefined,
    voiceBlob: undefined,
    currentTime: 0,
    voiceMessageDuration: 0,
};

export const recorderSlice = createSlice({
    name: 'recorder',
    initialState,
    reducers: {
        startRecording: (state: RecorderState) => {
            state.startRecordingTime = new Date().getTime();
            state.isRecording = true;

            state.voiceMessageId = undefined;

            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.pause();
                audioPlayer.src = '';
                audioPlayer.onended = null;
            }

            state.isPlayingMessage = false;
        },
        stopPlaying: (state: RecorderState) => {
            state.isPlayingRecord = false;

            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }
        },
        setIsPlayingRecord: (state: RecorderState, action: PayloadAction<boolean>) => {
            const nextState: boolean = action.payload;
            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                if (nextState) {
                    audioPlayer.play();
                } else {
                    audioPlayer.pause();
                }
            }

            state.isPlayingRecord = nextState;
        },
        setPlayerSource: (_, action: PayloadAction<string>) => {
            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.src = action.payload;
                audioPlayer.load();
            }
        },
        setRecorded: (state: RecorderState, action: PayloadAction<Blob>) => {
            state.isRecorded = true;
            state.isRecording = false;
            state.voiceBlob = action.payload;

            if (state.startRecordingTime !== undefined) {
                state.recordDuration = new Date().getTime() - state.startRecordingTime;
            }
        },
        clearRecorded: (state: RecorderState) => {
            state.isRecorded = false;
            state.startRecordingTime = undefined;
            state.isPlayingRecord = false;

            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.pause();
            }

            state.recordURL = undefined;
            state.voiceBlob = undefined;
        },
        setPlayMessage: (
            state: RecorderState,
            action: PayloadAction<{ id: string; src: string; duration: number }>,
        ) => {
            state.voiceMessageId = action.payload.id;
            state.voiceMessageDuration = action.payload.duration;
            state.isPlayingMessage = true;

            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.src = VOICE_URL + action.payload.src;
                audioPlayer.volume = state.volume;
                audioPlayer.playbackRate = state.speed;
                audioPlayer.play();
            }
        },
        setVolume: (state: RecorderState, action: PayloadAction<string>) => {
            const nextVolume: number = +action.payload;
            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.volume = nextVolume;
            }

            state.volume = nextVolume;
            state.currentTime = audioPlayer.currentTime;
            localStorage.setItem('voice-volume', action.payload);
        },
        setSpeed: (state: RecorderState, action: PayloadAction<string>) => {
            const nextSpeed: number = +action.payload;
            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.playbackRate = nextSpeed;
            }

            state.speed = nextSpeed;
            state.currentTime = audioPlayer.currentTime;
            localStorage.setItem('voice-speed', action.payload);
        },
        setCurrentTime: (state: RecorderState, action: PayloadAction<string>) => {
            const nextTimeInPercentage: number = +action.payload;
            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.currentTime =
                    (nextTimeInPercentage * state.voiceMessageDuration) /
                    (100 * SECOND_IN_MILLISECONDS);
            }

            state.currentTime =
                (state.voiceMessageDuration * nextTimeInPercentage) /
                (100 * SECOND_IN_MILLISECONDS);
        },
        setIsPLayingVoiceMessage: (state: RecorderState, action: PayloadAction<boolean>) => {
            const nextState: boolean = action.payload;
            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                if (nextState) {
                    audioPlayer.play();
                } else {
                    audioPlayer.pause();
                }
            }

            state.isPlayingMessage = nextState;
        },
        finishVoiceMessage: (state: RecorderState) => {
            state.voiceMessageId = undefined;
            state.isPlayingMessage = false;
            state.voiceMessageDuration = 0;

            const audioPlayer: HTMLMediaElement = document.getElementById(
                'voice-messages-recorder',
            ) as HTMLMediaElement;

            if (audioPlayer !== null) {
                audioPlayer.pause();
                audioPlayer.src = '';
                audioPlayer.onended = null;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoadVoiceRecord.fulfilled, (state: RecorderState, action) => {
            const data = action.payload as LoadVoiceRecordResponse;

            if (data.status !== 200) {
                return;
            }

            state.recordURL = data.recordURL;
        });
    },
});

export const {
    setCurrentTime,
    setSpeed,
    setVolume,
    setPlayMessage,
    setIsPLayingVoiceMessage,
    finishVoiceMessage,
    stopPlaying,
    setIsPlayingRecord,
    startRecording,
    setPlayerSource,
    setRecorded,
    clearRecorded,
} = recorderSlice.actions;

export default recorderSlice.reducer;
