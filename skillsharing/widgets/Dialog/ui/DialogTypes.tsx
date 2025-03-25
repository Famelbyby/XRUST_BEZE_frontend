export interface DialogItem {
    id: number,
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