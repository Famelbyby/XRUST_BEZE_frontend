//Login errors
export const AUTH_LOGIN_NOT_EXIST = 'rpc error: code = Unknown desc = user does not exist';
export const AUTH_LOGIN_WRONG_PASSWORD = "wrong password (can't authorize)";

//Sign up errors
export const AUTH_SIGNUP_EMAIL_EXIST =
    'rpc error: code = AlreadyExists desc = email already exists';
export const AUTH_SIGNUP_USERNAME_EXIST =
    'rpc error: code = AlreadyExists desc = username already exists';
export const AUTH_SIGNUP_MODERATION =
    'rpc error: code = Internal desc = failed to create user: profanity detected';

//Settings errors
export const SETTINGS_USERNAME_EXIST = 'username already exists';
export const SETTINGS_PROFANITY_DETECTED = 'profanity detected';
