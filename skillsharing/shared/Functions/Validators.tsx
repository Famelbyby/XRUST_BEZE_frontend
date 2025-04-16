import {MIN_USERNAME_LENGTH, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, VALID_AVATAR_EXTENSIONS, AVATAR_MAX_SIZE, MAX_ATTACHMENTS_SIZE} from '../Consts/ValidatorsConts'

/**
 * Validates username on next rules: min length - 3, max length - 50, can't include [!/|\0-9+=?]
 * @param username - Given username
 * @returns is username valid or not
 */
export function ValidateUsername(username: string): boolean {
    if (username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH) {
        return false;
    }

    if (!username.match(/(.)*[a-zA-z](.)*/)) {
        return false;
    }

    if (username[0] === '.' || username[username.length - 1] === '.') {
        return false;
    }

    if (username.match(/(.)*(\.\.)(.)*/)) {
        return false;
    }

    if (username.match(/(.)*[|!\\/+={}[*^&$%#@№`~()?\]](.)*/)) {
        return false;
    }

    return true;
}

/**
 * Validates email on next rules; must include the symbol '@'
 * @param email - Given Email
 * @returns is email valid
 */
export function ValidateEmail(email: string): boolean {
    if (!email.match(/(.)*@(.*)/)) {
        return false;
    }

    return true;
}

/**
 * Validates avatar file by extension
 * @param file - Avatar file
 * @returns is valid
 */
export function ValidateAvatarExtension(file: File): boolean {
    let isValid = false;
    
    VALID_AVATAR_EXTENSIONS.forEach((extension: string) => {
        isValid = isValid || file.name.endsWith(extension);
    });

    return isValid;
}

/**
 * Validates avatar file by size
 * @param file - Avatar file
 * @returns is valid
 */
export function ValidateAvatarSize(file: File): boolean {
    return file.size < AVATAR_MAX_SIZE;
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

    if (!password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[0-9]/) || !password.match(/[!@#$%^&*]/)) {
        return false;
    }

    return true;
}

/**
 * Checks if passwords are equal
 * @param password - First password
 * @param repeatPassword - Second password
 * @returns true if they are equal; false otherwise
 */
export function MatchPasswords(password: string, repeatPassword: string): boolean {
    return password === repeatPassword;
}

/**
 * Checks is size of attachments valid
 * 
 * @param currentAttachments - Already added attachments
 * @param newAttachment - Attachment user wants to add
 * @returns is summarized size is valid
 */
export function ValidateAttachments(currentAttachments: File[], newAttachment: File): boolean {
    return currentAttachments.reduce((accum: number, attachment: File) => accum + attachment.size, 0) + newAttachment.size <= MAX_ATTACHMENTS_SIZE;
}

/**
 * Validates new href
 * 
 * @param href - Given href
 * @returns is href valid
 */
export function ValidateHref(href: string): boolean {
    return !!href.match(/http(s)*:\/\/(.)+(\.)(.)+/);
}