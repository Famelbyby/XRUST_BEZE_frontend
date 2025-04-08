import axios from "axios";
import { IMessage } from "../../../entity/Message/MessageTypes";
import { BACK_URL, CHAT_URL } from "../../../shared/Consts/URLS";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileType } from "../../Profile/ui/ProfileTypes";
import { CODE_BAD, CODE_OK } from "../../../shared/Consts/Codes";
import { ChannelRequest } from "../../../shared/Consts/Interfaces";

const OWN_USER_ID_MOCK = "67e3b36b9a36154096b4bbea";

const notAuthedUserMock: ProfileType | undefined = undefined;

const userMock: ProfileType = {
    id: "67e3b36b9a36154096b4bbea",
    username: 'Shkaf Unichtojitel',
    avatar: '/Profile/avatar.png',
    bio: '[!i for i in [‘Красивый’, ‘Умный’, ‘Обаятельный’, ‘Спортсмен’]]',
    skills_to_learn: [
        {
            name: 'Figma',
            description: '',
            level: 'intermediate',
        },
        {
            name: 'Nginx',
            description: '',
            level: 'beginner',
        },
        {
            name: 'Docker',
            description: '',
            level: 'advanced',
        },
        {
            name: 'JavaScript',
            description: '',
            level: 'advanced',
        },
    ],
    skills_to_share: [
        {
            name: 'Kafka',
            description: '',
            level: 'beginner',
        },
        {
            name: 'Networks',
            description: '',
            level: 'advanced',
        },
    ],
    email: "ok",
    created_at: "2025-01-03T00:00:00Z",
    updated_at: "2025-01-03T00:00:00Z",
    last_active_at: "2025-01-03T00:00:00Z",
    preferred_format: "voice",
}

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

export const GetChannelByIds = createAsyncThunk(
    'chats/getChannelByIds',
    async ({userId, peerId}: ChannelRequest) => {
        try {
            const {status, data} = await axios.get(BACK_URL + CHAT_URL + `/channels/by-peer?user_id=${userId}&peer_id=${peerId}`);
            
            return {channelData: {...data, userId}, status: status};
        } catch(event) {
            console.log(event);

            return {channelData: undefined, status: CODE_BAD, userId};
        }
    }
)