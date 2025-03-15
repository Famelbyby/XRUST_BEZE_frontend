class MainWebSocket {
    #socket: WebSocket;
    #observers: Array<(arg: string) => void>;

    constructor() {
        this.#socket = new WebSocket('ws://localhost:8080/ws');
        this.#observers = [];
    }

    addObserver = (newObserver: (arg: string) => void) => {
        this.#observers.push(newObserver);
    }

    sendMessage = (data: string) => {
        this.#socket.send(data);
        this.receivedMessage(data);
    }

    receivedMessage = (data: string) => {
        this.#observers.forEach((observer) => {
            observer(data);
        })
    }
};

export default new MainWebSocket;