import {CommunicationFormat} from './Interfaces'

export const PREFERRED_FORMAT_TRANSLATION: Record<CommunicationFormat, string> = {
    "voice": "голосом",
    "text": "текстом",
    "video": "через видео",
}

export const PREFERRED_FORMAT_TYPES: CommunicationFormat[] = [
    "text",
    "video",
    "voice",
]