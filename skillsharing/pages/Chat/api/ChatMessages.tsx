import axios from "axios";
import { IMessage } from "../../../entity/Message/MessageTypes";
import { BACK_URL } from "../../../shared/Consts/NetworkConsts";
import User from "../../../entity/User/User";

const CHAT_URL = '/chat';
const OWN_USER_ID_MOCK = User.getUserID();

const messagesMock: Array<IMessage> = [
    {
        type: "send_message",
        message_id: "1",
        event: "EventText",
        channel_id: "0",
        peer_id: "67e3b36b9a36154096b4bbea", 
        user_id: OWN_USER_ID_MOCK,
        payload: "Добрый день, Shkaf! Видел Вашу анкету, ваши познания в CS:GO и Dota 2 меня поразили, не могли бы Вы рассказать как занимать банан на Инферно и коннектор на Мираже?",
        created_at: 1231231,
        updated_at: 1231231,
    },
    {
        type: "send_message",
        message_id: "2",
        event: "EventText",
        channel_id: "0",
        user_id: OWN_USER_ID_MOCK,
        peer_id: "1",
        payload: "Приветствую! Да, с превеликим удовольствием. Сейчас составлю Вам план (с помощью встроенной функции)",
        created_at: 1231231,
        updated_at: 1231231,
    },
    {
        type: "send_message",
        message_id: "3",
        event: "EventText",
        channel_id: "0",
        user_id: OWN_USER_ID_MOCK,
        peer_id: "2",
        payload: "Приветствую! Да, с превеликим удовольствием. Сейчас составлю Вам план (с помощью встроенной функции)",
        created_at: 1231231,
        updated_at: 1231231,
    },
    {
        type: "send_message",
        message_id: "4",
        event: "EventText",
        channel_id: "0",
        user_id: OWN_USER_ID_MOCK,
        peer_id: "2",
        payload: "Приветствую! Да, с превеликим удовольствием. Сейчас составлю Вам план (с помощью встроенной функции)",
        created_at: 1231231,
        updated_at: 1231231,
    },
    {
        type: "send_message",
        message_id: "5",
        event: "EventText",
        channel_id: "0",
        user_id: OWN_USER_ID_MOCK,
        peer_id: "2",
        payload: "Приветствую! Да, с превеликим удовольствием. Сейчас составлю Вам план (с помощью встроенной функции)",
        created_at: 1231231,
        updated_at: 1231231,
    },
    {
        type: "send_message",
        message_id: "6",
        event: "EventText",
        channel_id: "0",
        user_id: OWN_USER_ID_MOCK,
        peer_id: "2",
        payload: "Приветствую! Да, с превеликим удовольствием. Сейчас составлю Вам план (с помощью встроенной функции)",
        created_at: 1231231,
        updated_at: 1231231,
    },
    {
        type: "send_message",
        message_id: "7",
        event: "EventText",
        channel_id: "0",
        user_id: OWN_USER_ID_MOCK,
        peer_id: "2",
        payload: "Приветствую! Да, с превеликим удовольствием. Сейчас составлю Вам план (с помощью встроенной функции)",
        created_at: 1231231,
        updated_at: 1231231,
    },
    {
        type: "send_message",
        message_id: "8",
        event: "EventText",
        channel_id: "0",
        user_id: OWN_USER_ID_MOCK,
        peer_id: "2",
        payload: "Приветствую! Да, с превеликим удовольствием. Сейчас составлю Вам план (с помощью встроенной функции)",
        created_at: 1231231,
        updated_at: 1231231,
    },
]

export async function GetChatMessages(channelID: string, callback: (messageData: IMessage[]) => void) {
    // (new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(messagesMock);
    //     }, 3000);
    // })).then((messagesData) => {
    //     callback(messagesData as IMessage[]);
    // });

    const {status, data} = await axios.get(BACK_URL + CHAT_URL + `/${channelID}`);

    console.log(status, data);

    if (status === 200) {
        callback(data?.messages as IMessage[]);
    }
}