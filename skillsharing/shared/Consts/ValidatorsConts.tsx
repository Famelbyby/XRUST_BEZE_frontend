export const SECOND_IN_MILLISECONDS = 1000;
export const MINUTE_IN_MILLISECONDS = 60 * SECOND_IN_MILLISECONDS;
export const HOUR_IN_MILLISECONDS = 60 * MINUTE_IN_MILLISECONDS;
export const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;
export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 25;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 64;
export const BYTES_IN_KB = 1024;
export const BYTES_IN_MB = BYTES_IN_KB * 1024;
export const AVATAR_MAX_SIZE = 5 * BYTES_IN_MB; //MB
export const BIO_MAX_LENGTH = 500;
export const MAX_ATTACHMENTS_LENGTH = 10;
export const MAX_ATTACHMENTS_SIZE = 100 * BYTES_IN_MB;
export const MAX_HREFS_COUNT = 5;
export const WRONG_HREF = 'Неправильный формат';
export const ATLEAST_ONE_SKILL = 'Надо выбрать хотя бы один';
export const VALID_AVATAR_EXTENSIONS = ['.png', '.jpeg', '.jpg', '.webp'];
export const RUSSIAN_MONTHS = [
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
];

export const WRONG_EMAIL_FORMAT = 'Неправильный формат почты';
export const EMAIL_ALREADY_EXISTS = 'Пользователь с такой почтой уже существует';
export const USERNAME_ALREADY_EXISTS = 'Пользователь с таким именем уже существует';
export const BAD_USERNAME = 'Неподходящее имя';
export const WRONG_PASSWORD_FORMAT =
    'Длина пароля - от 8 до 64 символов. Должны быть хотя бы одна заглавная буква, одна строчная, одна цифра и один спецсимвол: !@#$%^&*';
export const WRONG_USERNAME_FORMAT =
    'Длина имени - от 3 до 25 символов. Содержит только символы латинского алфавита, нижние подчеркивания и точки';
export const PASSWORD_MISMATCH = 'Пароли не совпадают';
export const BAD_BIO = 'Неподходящее описание';
