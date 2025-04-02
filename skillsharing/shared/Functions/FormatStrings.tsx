/**
 * Capitalizes the given string and returns copy
 * @param str - Given string
 * @returns capitalized string
 */
export function CapitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}