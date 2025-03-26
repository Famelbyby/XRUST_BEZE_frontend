import { Skill } from "../ProfileLeftColumn/ProfileLeftColumnTypes";

export interface DialogTagsPropTypes {
    handleCheckingTag: (tags: Skill[]) => void,
    tags: Skill[],
}