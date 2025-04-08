export const MINUTE_IN_MILLISECONDS: number = 60 * 1000;
export const HOUR_IN_MILLISECONDS: number = 60 * MINUTE_IN_MILLISECONDS;
export const DAY_IN_MILLISECONDS: number = 24 * HOUR_IN_MILLISECONDS;
export const MIN_USERNAME_LENGTH: number = 3;
export const MAX_USERNAME_LENGTH: number = 25;
export const MIN_PASSWORD_LENGTH: number = 6;
export const MAX_PASSWORD_LENGTH: number = 12;
export const BYTES_IN_MB: number = 1024 * 1024;
export const AVATAR_MAX_SIZE: number = 5 * BYTES_IN_MB;//MB
export const BIO_MAX_LENGTH = 500;
export const VALID_AVATAR_EXTENSIONS: string[] = [
    '.png',
    '.jpeg',
    '.jpg',
    '.webp'
];
export const RUSSIAN_MONTHS: string[] = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
]