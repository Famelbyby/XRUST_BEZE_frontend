import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';

export interface SkillsTagsPropTypes {
    handleFilteringSomething: (tags: string[], user: ProfileType) => void;
}
