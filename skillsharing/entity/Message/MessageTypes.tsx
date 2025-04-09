type MessageType = "send_message" | "update_message" | "delete_message";

export interface IMessage extends ISendingMessage, IDeletingMessage, IUpdatingMessage {
    message_id: string,
    type?: MessageType,
    event?: string,
    channel_id: string | undefined,
    user_id: string,
    payload: string,
    peer_id: string,
    created_at: number,
    updated_at: number,
    structurized?: string,
}

export interface IDeletingMessage {
    type?: MessageType,
    user_id: string,
    channel_id?: string,
    peer_id: string,
    event?: string,
    message_id: string,
}

export interface IStructurizeMessage {
    event: string,
    message_id: string,
    channel_id: string,
}

export interface IUpdatingMessage {
    type?: MessageType,
    user_id: string,
    channel_id?: string,
    peer_id: string,
    event?: string,
    message_id: string,
    payload: string,
    created_at: number,
}

export interface ISendingMessage {
    type?: MessageType,
    event?: string,
    peer_id: string, //mocked = 2 - this is a mate's ID
    channel_id?: string, 
    user_id: string, //mocked = from local storage
    payload: string, //text message content
}