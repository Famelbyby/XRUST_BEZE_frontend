/**
 * Checks if current URL location starts with given pathname
 * @param location - Current URL location
 * @param pathname - Given pathname
 * @returns True if starts; otherwise false
 */
export function ComparePathnames(location: string, pathname: string) {
    return location.startsWith(pathname);
};