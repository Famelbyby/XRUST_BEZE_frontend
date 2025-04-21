import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LoadVoiceRecord } from '../../pages/Chat/api/Chat';
import { LoadVoiceRecordResponse } from '../../shared/Consts/Interfaces';
import { VOICE_URL } from '../../shared/Consts/URLS';

export interface RecorderState {
  isRecording: boolean,
  isRecorded: boolean,
  isPlayingRecord: boolean,
  isPlayingMessage: boolean,
  voiceMessageId: string | undefined,
  audioPlayer: object,
  recordDuration: number,
  startRecordingTime: number | undefined,
  volume: number,
  speed: number,
  currentTime: number,
  recordURL: string | undefined,
  voiceBlob: Blob | undefined,
}

const initialState: RecorderState = {
  isRecording: false,
  isPlayingRecord: false,
  audioPlayer: new Audio(),
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
}

export const recorderSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    startRecording: (state: RecorderState) => {
      state.startRecordingTime = (new Date()).getTime();
      state.isRecording = true;

      state.voiceMessageId = undefined;
      (state.audioPlayer as HTMLAudioElement).pause();
      (state.audioPlayer as HTMLAudioElement).src = '';
      state.isPlayingMessage = false;
      (state.audioPlayer as HTMLAudioElement).onended = null;
    },
    stopPlaying: (state: RecorderState) => {
      state.isPlayingRecord = false;
      (state.audioPlayer as HTMLAudioElement).pause();
      (state.audioPlayer as HTMLAudioElement).currentTime = 0;
    },
    setIsPlayingRecord: (state: RecorderState, action: PayloadAction<boolean>) => {
      const nextState: boolean = action.payload;

      if (nextState) {
        (state.audioPlayer as HTMLAudioElement).play();
      } else {
        (state.audioPlayer as HTMLAudioElement).pause();
      }

      state.isPlayingRecord = nextState;
    },
    setPlayerSource: (state: RecorderState, action: PayloadAction<string>) => {
      (state.audioPlayer as HTMLAudioElement).src = action.payload;
      (state.audioPlayer as HTMLAudioElement).load();
    },
    setRecorded: (state: RecorderState, action: PayloadAction<Blob>) => {
      state.isRecorded = true;
      state.isRecording = false;
      state.voiceBlob = action.payload;

      if (state.startRecordingTime !== undefined) {
        state.recordDuration = (new Date()).getTime() - state.startRecordingTime;
      }
    },
    clearRecorded: (state: RecorderState) => {
      state.isRecorded = false;
      state.startRecordingTime = undefined;
      state.isPlayingRecord = false;
      (state.audioPlayer as HTMLAudioElement).pause();
      state.recordURL = undefined;
      state.voiceBlob = undefined;
    },
    setPlayMessage: (state: RecorderState, action: PayloadAction<{id: string, src: string}>) => {
      state.voiceMessageId = action.payload.id;
      (state.audioPlayer as HTMLAudioElement).src = VOICE_URL + action.payload.src;
      state.isPlayingMessage = true;
      (state.audioPlayer as HTMLAudioElement).volume = state.volume;
      (state.audioPlayer as HTMLAudioElement).playbackRate = 1;
      (state.audioPlayer as HTMLAudioElement).play();
    },
    setVolume: (state: RecorderState, action: PayloadAction<string>) => {
      const nextVolume: number = +(action.payload);
      
      (state.audioPlayer as HTMLAudioElement).volume = nextVolume;
      state.volume = nextVolume;
      localStorage.setItem('voice-volume', action.payload);
    },
    setSpeed: (state: RecorderState, action: PayloadAction<string>) => {
      const nextSpeed: number = +(action.payload);
      
      (state.audioPlayer as HTMLAudioElement).playbackRate = 1;
      state.speed = nextSpeed;
      console.log(state.speed);
      localStorage.setItem('voice-speed', action.payload);
    },
    setCurrentTime: (state: RecorderState, action: PayloadAction<string>) => {
      const nextTime: number = +(action.payload);
      
      (state.audioPlayer as HTMLAudioElement).currentTime = nextTime;
      state.currentTime = nextTime;
    },
    setIsPLayingVoiceMessage: (state: RecorderState, action: PayloadAction<boolean>) => {
      const nextState: boolean = action.payload;

      if (nextState) {
        (state.audioPlayer as HTMLAudioElement).play();
      } else {
        (state.audioPlayer as HTMLAudioElement).pause();
      }

      state.isPlayingMessage = nextState;
    },
    finishVoiceMessage: (state: RecorderState) => {
      state.voiceMessageId = undefined;
      (state.audioPlayer as HTMLAudioElement).pause();
      (state.audioPlayer as HTMLAudioElement).src = '';
      state.isPlayingMessage = false;
      (state.audioPlayer as HTMLAudioElement).onended = null;
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
})

export const { setCurrentTime, setSpeed, setVolume, setPlayMessage, setIsPLayingVoiceMessage, finishVoiceMessage, stopPlaying, setIsPlayingRecord, startRecording, setPlayerSource, setRecorded, clearRecorded } = recorderSlice.actions

export default recorderSlice.reducer