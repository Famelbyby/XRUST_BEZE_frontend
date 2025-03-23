export const comparePathnames: (location: string, pathname: string) => boolean = (location: string, pathname: string) => {
    return location.startsWith(pathname);
};