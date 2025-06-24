import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import { useEffect, useState } from 'react';
import { NormalizeTextarea } from '../../shared/Functions/FormatComponents';
import { AVATAR_URL } from '../../shared/Consts/URLS';
import SkillsLine from '../SkillsLine/SkillsLine';
import { AddReview } from '../../pages/Profile/api/Profile';

const TEXTAREA_INITIAL_HEIGHT = 23;
const TEXTAREA_ID = 'textarea';

const ProfileAddReview: React.FC = () => {
    const { user, theme } = useSelector((state: AppState) => state.user);
    const { user: profile } = useSelector((state: AppState) => state.profile);
    const [textareaInput, setTextareaInput] = useState('');
    const [rating, setRating] = useState(1);
    const dispatch = useDispatch<AppDispatch>();

    function handleChangingTextareaInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();

        const textAreaInput: HTMLTextAreaElement = event.target;

        if (textAreaInput.value.length === 300) {
            return;
        }

        NormalizeTextarea(TEXTAREA_ID, TEXTAREA_INITIAL_HEIGHT);
        setTextareaInput(textAreaInput.value);
    }

    useEffect(() => {
        NormalizeTextarea(TEXTAREA_ID, TEXTAREA_INITIAL_HEIGHT);
    }, []);

    return (
        <>
            {user !== undefined && profile !== undefined && (
                <div className={'profile-add-review' + ` ${theme}-mode__bright-border`}>
                    <img
                        className="profile-add-review-user__avatar"
                        src={AVATAR_URL + user.avatar}
                        alt=""
                    />
                    <div className="profile-add-review-content">
                        <div className="profile-add-review-header">
                            <div className="profile-add-review-user-info">
                                <div className="profile-add-review-user-info__name">
                                    {user.username}
                                </div>
                                <div className="profile-add-review-rating">
                                    {[1, 2, 3, 4, 5].map((rate) => {
                                        const ifYellowStar = rate <= rating;

                                        return (
                                            <img
                                                key={rate}
                                                className={
                                                    'profile-add-review-rating__img' +
                                                    (!ifYellowStar ? ` ${theme}-mode__img` : '')
                                                }
                                                src={
                                                    '/ProfilePage/star' +
                                                    (ifYellowStar ? '_yellow' : '') +
                                                    '.png'
                                                }
                                                alt=""
                                                onClick={() => setRating(rate)}
                                            />
                                        );
                                    })}
                                    {rating}
                                </div>
                            </div>
                            <div className="profile-add-review-info__tags">
                                <SkillsLine skills={user.skills_to_share} />
                            </div>
                        </div>
                        <div className="profile-add-review-footer">
                            <div className="profile-add-review-info">
                                <textarea
                                    id="textarea"
                                    className={
                                        'profile-add-review-user-info__input' +
                                        ` ${theme}-mode__bright-text`
                                    }
                                    value={textareaInput}
                                    onChange={(event) => handleChangingTextareaInput(event)}
                                    placeholder="Ваш комментарий..."
                                ></textarea>
                            </div>
                            <img
                                className="profile-add-review-footer__send-review"
                                src="/shared/send.png"
                                alt="Отправить комментарий"
                                onClick={() => {
                                    dispatch(
                                        AddReview({
                                            text: textareaInput,
                                            rating,
                                            user_id_by: user.id,
                                            user_id_to: profile.id,
                                        }),
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileAddReview;
