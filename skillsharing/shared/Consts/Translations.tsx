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
