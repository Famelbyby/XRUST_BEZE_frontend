import {WEBSOCKET_URL} from './Consts/URLS'

class MainWebSocket {
    private socket: WebSocket | undefined;
    private observers: Record<string, (arg: string) => void>;
    private isOpened: boolean;

    constructor() {
        this.socket = undefined;
        this.observers = {};
        this.isOpened = false;
    }

    openConnection = (userId: string) => {
        if (this.isOpened) {
            return;
        }

        this.socket = new WebSocket(WEBSOCKET_URL + userId);

        this.socket.onopen = () => {
            this.isOpened = true;
        }

        this.socket.onmessage = (event: WebSocketEventMap["message"]) => {
            this.receivedMessage(event.data);
        }
    }

    addObserver = (observerName: string, newObserver: (arg: string) => void) => {
        this.observers[observerName] = newObserver;
    }

    removeObserver = (observerName: string) => {
        delete this.observers[observerName];
    }

    sendMessage = (data: string) => {
        if (this.socket !== undefined) {
            this.socket.send(data);
        }
    }

    receivedMessage = (data: string) => {
        for (const observer of Object.values(this.observers)) {
            observer(data);
        }
    }

    closeConnection = () => {
        if (this.socket !== undefined) {
            this.socket.close(1000);
        }
    }
};

export default new MainWebSocket;