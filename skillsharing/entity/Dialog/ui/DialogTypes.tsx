import { IMessage } from "../../Message/MessageTypes";
import { ProfileType } from "../../../pages/Profile/ui/ProfileTypes";

export interface DialogItem {
    channel_id: string,
    user_ids: ProfileType["id"][],
    users: ProfileType[],
    last_message: IMessage | null,
    created: number,
    updated: number,
}

export interface DialogProps {
    dialog: DialogItem | undefined,
}