import { Skill } from "../../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes";

export interface ProfileType {
    "id": string,
    "username": string,
    "email": string,
    "avatar_url": string,
    "bio": string,
    "skills_to_learn": Skill[],
    "skills_to_share": Skill[],
    "created_at": string,
    "updated_at": string,
    "last_active_at": string,
};