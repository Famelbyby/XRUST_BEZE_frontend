export interface MessageType extends SendingMessageType{
    message_id: number,
    event: string,
    channel_id: number,
    user_id: number,
    payload: string,
    seen: boolean,
    time: number,
}

export interface SendingMessageType {
    event: string,
    channel_id: number, //mocked = 1
    user_id: number, //mocked = from local storage
    payload: string, //text message content
}