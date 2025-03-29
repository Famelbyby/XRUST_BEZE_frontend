const MIN_USERNAME_LENGTH: number = 3;
const MAX_USERNAME_LENGTH: number = 50;
const MIN_PASSWORD_LENGTH: number = 6;
const MAX_PASSWORD_LENGTH: number = 12;

/**
 * Validates username on next rules: min length - 3, max length - 50, can't include [!/|\0-9+=?]
 * @param username - Given username
 * @returns is username valid or not
 */
export function ValidateUsername(username: string): boolean {
    if (username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH) {
        return false;
    }

    if (!username.match(/(.)*[a-zA-zА-Яа-я](.)*/)) {
        return false;
    }

    if (username.match(/(.)*[0-9|!\\/+-=.](.)*/)) {
        return false;
    }

    return true;
}

/**
 * Validates password on next rules: min length - 6, max length - 12
 * @param password - Given password
 * @returns is password valid or not
 */
export function ValidatePassword(password: string): boolean {
    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
        return false;
    }

    return true;
}