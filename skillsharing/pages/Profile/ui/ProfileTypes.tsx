export interface ProfileType {
    id: number,
    name: string,
    avatar: string,
    description: string,
    tags: string[],
    rating: number,
    helps: number,
    rate: number,
    lastSeen: string,
    hrefs: string[],
    feedbacks: never[],
};