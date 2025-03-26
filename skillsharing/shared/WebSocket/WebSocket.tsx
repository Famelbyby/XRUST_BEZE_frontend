import { WEBSOCKET_URL } from "../Consts/NetworkConsts";

class MainWebSocket {
    #socket: WebSocket | null;
    #observers: Record<string, (arg: string) => void>;

    constructor() {
        this.#observers = {};
        this.#socket = null;
    }

    openSocket = (userID: string) =>  {
        this.#socket = new WebSocket(WEBSOCKET_URL + userID);
        this.#socket.onmessage = (event: WebSocketEventMap["message"]) => {
            this.receivedMessage(event.data);
        }
    }

    addObserver = (observerName: string, newObserver: (arg: string) => void) => {
        this.#observers[observerName] = newObserver;
    }

    removeObserver = (observerName: string) => {
        delete this.#observers[observerName];
    }

    sendMessage = (data: string) => {
        this.#socket!.send(data);
        this.receivedMessage(data);
    }

    receivedMessage = (data: string) => {
        for (const observer of Object.values(this.#observers)) {
            observer(data);
        }
    }
};

export default new MainWebSocket;