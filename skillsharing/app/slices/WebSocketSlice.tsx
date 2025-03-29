import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WEBSOCKET_URL } from '../../shared/Consts/URLS';

export interface WebSocketState {
  conn: WebSocket | undefined;
  observers: Record<string, (data: string) => void>;
  isOpened: boolean;
}

const initialState: WebSocketState = {
    conn: undefined,
    observers: {},
    isOpened: false,
}

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    openConnection: (state: WebSocketState, action: PayloadAction<string>) => {
        state.conn = new WebSocket(WEBSOCKET_URL + action.payload);

        state.conn.onopen = () => {
            state.isOpened = true;

            state.conn!.onmessage = (event) => {
                websocketSlice.caseReducers.receivedMessage(state, {type: 'received_message', payload: event.data});
            }
        };
    },
    addObserver: (state: WebSocketState, action: PayloadAction<{observerName: string, observerCallback: (data: string) => void}>) => {
        const {observerName, observerCallback} = action.payload;

        state.observers[observerName] = observerCallback;
    },
    sendMessage: (state: WebSocketState, action: PayloadAction<string>) => {
        if (state.conn !== undefined) {
            state.conn.send(action.payload);
        }
    },
    receivedMessage: (state: WebSocketState, action: PayloadAction<string>) => {
        for (const observer of Object.values(state.observers)) {
            observer(action.payload);
        }
    },
    removeObserver: (state: WebSocketState, action: PayloadAction<string>) => {
        delete state.observers[action.payload];
    },
    closeConnection: (state: WebSocketState) => {
        if (state.conn !== undefined) {
            state.conn.close(1000);
        }
    },
  },
})

export const { openConnection, sendMessage, receivedMessage, addObserver, removeObserver, closeConnection } = websocketSlice.actions

export default websocketSlice.reducer