import { BYTES_IN_KB, BYTES_IN_MB } from '../Consts/ValidatorsConts';

/**
 * Capitalizes the given string and returns copy
 * @param str - Given string
 * @returns capitalized string
 */
export function CapitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function RoundSize(bytes: number): string {
    let result: string;

    switch (true) {
        case bytes / BYTES_IN_KB < 1:
            result = `${bytes} байт`;
            break;
        case bytes / BYTES_IN_MB < 1:
            result = `${Math.floor(bytes / BYTES_IN_KB)} Кб`;
            break;
        default:
            result = `${Math.floor(bytes / BYTES_IN_MB)} Мб`;
            break;
    }

    return result;
}
