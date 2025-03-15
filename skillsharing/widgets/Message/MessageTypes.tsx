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
    channel_id: number, //mocked = 2 - this is a mate's ID
    user_id: number, //mocked = from local storage
    payload: string, //text message content
}