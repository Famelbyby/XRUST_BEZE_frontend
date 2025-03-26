import { WEBSOCKET_URL } from "../Consts/NetworkConsts";

class MainWebSocket {
    private socket: WebSocket | null;
    private observers: Record<string, (arg: string) => void>;
    private isOpened: boolean;

    constructor() {
        this.observers = {};
        this.socket = null;
        this.isOpened = false;
    }

    openSocket = (userID: string) =>  {
        if (this.isOpened) {
            return;
        }

        this.isOpened = true;
        this.socket = new WebSocket(WEBSOCKET_URL + userID);
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
        this.socket!.send(data);
        //this.receivedMessage(data);
    }

    receivedMessage = (data: string) => {
        for (const observer of Object.values(this.observers)) {
            observer(data);
        }
    }
};

export default new MainWebSocket;