import { Skill } from "../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes";

export interface SkillsTagsPropTypes {
    handleCheckingTag: (tags: Skill[]) => void,
    tags: Skill[],
}