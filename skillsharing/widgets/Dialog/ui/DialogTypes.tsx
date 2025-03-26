export interface DialogItem {
    id: string,
    name: string,
    avatar: string,
    seen: boolean,
    text: string,
    time: number,
    tags: string[],
}

export interface DialogProps {
    dialog: DialogItem | undefined,
}