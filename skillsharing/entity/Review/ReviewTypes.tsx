import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';

export default interface ReviewType {
    id: string;
    text: string;
    rating: number;
    user_id_by: string;
    user_id_to: string;
    created: number;
    updated: number;
    user_by: ProfileType;
}
