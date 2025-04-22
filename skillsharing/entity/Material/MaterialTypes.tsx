export interface MaterialAuthor {
    username: string,
    avatar: string,
}

export interface MaterialItem {
    id: string,
    name: string,
    filename: string,
    tags: string[],
    author_id: string | undefined,
    author: undefined | MaterialAuthor,
    created: number,
    updated: number,
}