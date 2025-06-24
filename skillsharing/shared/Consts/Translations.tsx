import { CommunicationFormat } from './Interfaces';

export const PREFERRED_FORMAT_TRANSLATION: Record<CommunicationFormat, string> = {
    voice: 'голосом',
    text: 'текстом',
    video: 'через видео',
};

export const PREFERRED_FORMAT_TYPES: CommunicationFormat[] = ['text', 'video', 'voice'];

export const SKILL_LEVELS_IN_RUSSIAN = {
    advanced: 'продвинутый',
    intermediate: 'средний',
    beginner: 'начинающий',
};

export const SEND_RELATED_TO_COLOR = {
    light: 'send',
    'dark-green': 'send_green',
    'dark-orange': 'send_orange',
};

export const CHECK_RELATED_TO_COLOR = {
    light: 'check',
    'dark-green': 'check_green',
    'dark-orange': 'check_orange',
};

export const CROSS_RELATED_TO_COLOR = {
    light: 'cross',
    'dark-green': 'cross_green',
    'dark-orange': 'cross_orange',
};
