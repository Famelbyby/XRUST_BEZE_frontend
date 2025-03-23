import { WEBSOCKET_URL } from "../Consts/NetworkConsts";

class MainWebSocket {
    #socket: WebSocket;
    #observers: Record<string, (arg: string) => void>;

    constructor() {
        this.#socket = new WebSocket(WEBSOCKET_URL);
        this.#observers = {};
        this.#socket.onmessage = (event: WebSocketEventMap["message"]) => {
            console.log(event.data);
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
        this.#socket.send(data);
        this.receivedMessage(data);
    }

    receivedMessage = (data: string) => {
        for (const observer of Object.values(this.#observers)) {
            observer(data);
        }
    }
};

export default new MainWebSocket;