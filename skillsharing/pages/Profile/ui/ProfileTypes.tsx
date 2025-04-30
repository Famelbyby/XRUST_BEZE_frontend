import { CommunicationFormat, Skill } from '../../../shared/Consts/Interfaces';

export interface ProfileType {
    id: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    skills_to_learn: Skill[];
    skills_to_share: Skill[];
    created_at: string;
    updated_at: string;
    last_active_at: string;
    preferred_format: CommunicationFormat;
    hrefs: string[] | null;
}
