import { DialogItem } from '../../entity/Dialog/ui/DialogTypes';
import { IMessage } from '../../entity/Message/MessageTypes';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import { MaterialItem } from '../../entity/Material/MaterialTypes';
import ReviewType from '../../entity/Review/ReviewTypes';

export interface TextFieldState {
    value: string;
    error: string | undefined;
}

export type Theme = 'light' | 'dark' | 'dark-green';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type CommunicationFormat = 'voice' | 'text' | 'video';
export type FilterType = 'name' | 'skill';

export interface Skill {
    name: string;
    level: SkillLevel;
    description: string;
}

export interface Category {
    category: string;
    skills: string[];
}

export interface UpdateReviewRequest {
    reviewId: string;
    text: string;
    rating: number;
}

export interface AddReviewRequest {
    text: string;
    rating: number;
    user_id_by: string;
    user_id_to: string;
}

export interface GetLastMessageResponse extends AnyAPIResponse {
    channelId: string;
    messages: IMessage[];
}

export interface CertainMaterialResponse extends AnyAPIResponse {
    material: MaterialItem;
}

export interface DeleteMaterialResponse extends AnyAPIResponse {
    materialId: string;
}

export interface UserMaterialsResponse extends AnyAPIResponse {
    materials: MaterialItem[];
}

export interface CategoryResponse extends AnyAPIResponse {
    categories: string[];
}

export interface PasswordFieldState extends TextFieldState {
    isHidden: boolean;
}

export interface AvatarFieldState {
    URL: string | undefined;
    file: File | undefined;
    error: string | undefined;
}

export interface ErrorResponse {
    error: string;
    profanity_error_fields?: string[];
    validation_error_fields?: string[];
}

export interface AnyAPIResponse {
    status: number;
    error: ErrorResponse | undefined;
}

export interface RegisterRequest extends AuthRequest {
    email: string;
    avatar_url: File | string | undefined;
    preferred_format: CommunicationFormat;
    bio: string;
    skills_to_learn: Skill[];
    skills_to_share: Skill[];
    hrefs: string[];
}

export interface AuthRequest {
    username: string;
    password: string;
    email: string;
}

export interface ProfileRequest {
    userId: string;
    callback: (profileData: ProfileType | undefined) => void;
}

export interface MessageRequest {
    messageId: string;
    userId: string;
}

export interface MessageResponse extends AnyAPIResponse {
    messageData: {
        message: IMessage;
        userId: string;
    };
}

export interface MatchUserRequest {
    userId: string;
}

export interface FindByNameUsersRequest {
    userId: string;
    query: string;
}

export interface ChannelRequest {
    userId: string;
    peerId: string;
}

export interface LoadAttachmentsResponse extends AnyAPIResponse {
    resultURLs: { status: number; data: { filename: string } }[];
}

export interface LoadVoiceRecordResponse extends AnyAPIResponse {
    recordURL: string | undefined;
}

export interface LoadAvatarRequest {
    avatar: File;
}

export interface UpdateProfileRequest {
    user: ProfileType;
    avatar: string | undefined;
    hrefs: string[];
}

export interface ChannelReponse extends AnyAPIResponse {
    channelData: {
        channel: DialogItem;
        messages: IMessage[];
        userId: string;
    };
}

export interface MatchedUsersResponse extends AnyAPIResponse {
    foundUsers: ProfileType[] | null;
}

export interface DialogsResponse extends AnyAPIResponse {
    dialogs: DialogItem[];
}

export interface LoadAvatarResponse extends AnyAPIResponse {
    avatarURL: string;
}

export interface DeleteReviewResponse extends AnyAPIResponse {
    reviewId: string;
}

export interface AddReviewResponse extends AnyAPIResponse {
    newReview: ReviewType;
}

export interface UserResponse extends AnyAPIResponse {
    user: ProfileType;
}

export interface ChatResponse extends AnyAPIResponse {
    messages: IMessage[];
}
