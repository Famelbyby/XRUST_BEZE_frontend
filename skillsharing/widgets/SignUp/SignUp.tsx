import React, { useEffect } from 'react';
import TextField from '../../features/TextField/TextField';
import PasswordField from '../../features/PasswordField/PasswordField';
import { useDispatch, useSelector } from 'react-redux';
import {
    editedAvatarField,
    editedEmailField,
    editedIdentifierField,
    editedPasswordField,
    editedRepeatPasswordField,
    toggleIsPasswordHidden,
    toggleIsRepeatPasswordHidden,
    setCommunicationFormat,
    editedBioField,
    addSkillToLearn,
    deleteSkillFromLearn,
    editedSkillToLearnLevel,
    increaseStep,
    decreaseStep,
    deleteHref,
    addHref,
    changeHref,
    addSkillToShare,
    deleteSkillFromShare,
    editedSkillToShareLevel,
} from '../../app/slices/SignUpSlice';
import { AppDispatch, AppState } from '../../app/AppStore';
import './SignUp.scss';
import { GetCategories, LoadAvatar, TryRegister } from '../../pages/Auth/api/Auth';
import {
    PREFERRED_FORMAT_TRANSLATION,
    PREFERRED_FORMAT_TYPES,
} from '../../shared/Consts/Translations';
import { CommunicationFormat } from '../../shared/Consts/Interfaces';
import { BIO_MAX_LENGTH, MAX_HREFS_COUNT } from '../../shared/Consts/ValidatorsConts';
import Loader from '../../features/Loader/Loader';
import { Helmet } from 'react-helmet';
import SkillToLayout from '../../features/SkillToLayout/SkillToLayout';

const SignUpAvatar: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { avatar } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch();

    return (
        <div
            className={'sign-up-avatar' + (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)}
        >
            Выберите аватарку
            <div className="sign-up-avatar-field">
                <img
                    className={
                        'sign-up-avatar__preview' +
                        (avatar.file === undefined ? ' sign-up-avatar_filtered' : '')
                    }
                    src={
                        avatar.file === undefined
                            ? '/AuthPage/default_avatar.png'
                            : URL.createObjectURL(avatar.file)
                    }
                    alt="Preview"
                    onClick={() => {
                        const avatarInput = document.querySelector(
                            '.sign-up-avatar__input',
                        ) as HTMLElement;

                        if (avatarInput !== null) {
                            avatarInput.click();
                        }
                    }}
                />
            </div>
            <input
                type="file"
                className="sign-up-avatar__input"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={(event) => {
                    const inputFiles = event.target.files;

                    if (inputFiles === null) {
                        return;
                    }

                    dispatch(editedAvatarField(inputFiles[0]));
                }}
            />
            <div className="sign-up-avatar__error">
                {avatar.error === undefined ? '' : avatar.error}
            </div>
        </div>
    );
};

const SignUpPreferredFormat: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { preferred_format } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch();

    return (
        <div
            className={
                'sign-up-preferred-format' +
                (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)
            }
        >
            Предпочитаю общаться
            <select
                className="sign-up-preferred-format-select"
                onChange={(event) => {
                    dispatch(setCommunicationFormat(event.target.value as CommunicationFormat));
                }}
            >
                {PREFERRED_FORMAT_TYPES.map((format: CommunicationFormat) => {
                    if (preferred_format === format) {
                        return (
                            <option
                                selected
                                className="sign-up-preferred-formata-select__option"
                                value={format}
                                key={format}
                            >
                                {PREFERRED_FORMAT_TRANSLATION[format]}
                            </option>
                        );
                    } else {
                        return (
                            <option
                                className="sign-up-preferred-formata-select__option"
                                value={format}
                                key={format}
                            >
                                {PREFERRED_FORMAT_TRANSLATION[format]}
                            </option>
                        );
                    }
                })}
            </select>
        </div>
    );
};

const SignUpRegisterButton: React.FC = () => {
    const {
        identifier,
        password,
        email,
        repeatPassword,
        avatar,
        preferred_format,
        isPending,
        bio,
        skills_to_learn,
        skills_to_share,
        hrefs,
        skillsToLearnError,
        skillsToShareError,
    } = useSelector((state: AppState) => state.signup);
    const { theme } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (avatar.URL !== undefined) {
            dispatch(
                TryRegister({
                    skills_to_learn,
                    skills_to_share,
                    username: identifier.value,
                    email: email.value,
                    password: password.value,
                    avatar_url: avatar.URL,
                    preferred_format,
                    bio: bio.value,
                    hrefs: hrefs.map((href) => href.value),
                }),
            );
        }
    }, [avatar.URL, dispatch]);

    return (
        <div
            className={
                'sign-up__button-reg' + (theme === 'light' ? '' : ` ${theme}-mode__bright-block`)
            }
            onClick={() => {
                if (isPending) {
                    return;
                }

                if (
                    identifier.error !== undefined ||
                    password.error !== undefined ||
                    repeatPassword.error !== undefined ||
                    email.error !== undefined ||
                    password.value === '' ||
                    identifier.value === '' ||
                    email.value === '' ||
                    repeatPassword.value === '' ||
                    hrefs.find((href) => href.error !== undefined) ||
                    skillsToLearnError !== undefined ||
                    skillsToShareError !== undefined
                ) {
                    return;
                }

                if (avatar.URL === undefined && avatar.file !== undefined) {
                    dispatch(LoadAvatar({ avatar: avatar.file }));
                } else {
                    dispatch(
                        TryRegister({
                            skills_to_learn,
                            skills_to_share,
                            username: identifier.value,
                            email: email.value,
                            password: password.value,
                            avatar_url: avatar.URL,
                            preferred_format,
                            bio: bio.value,
                            hrefs: hrefs.map((href) => href.value),
                        }),
                    );
                }
            }}
        >
            {!isPending && <>Создать аккаунт</>}
            {isPending && <Loader />}
        </div>
    );
};

const SignUpIdentifier: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { identifier } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <TextField
            theme={theme}
            title="Имя"
            value={identifier.value}
            error={identifier.error}
            onChangingField={(data: string) => dispatch(editedIdentifierField(data))}
            placeholder="PlayBoy"
        />
    );
};

const SignUpEmail: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { email } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <TextField
            theme={theme}
            title="Почта"
            value={email.value}
            error={email.error}
            onChangingField={(data: string) => dispatch(editedEmailField(data))}
            placeholder="coolboy@always.com"
        />
    );
};

const SignUpPassword: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { password } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <PasswordField
            theme={theme}
            title="Пароль"
            value={password.value}
            onChangingField={(data: string) => dispatch(editedPasswordField(data))}
            error={password.error}
            isHidden={password.isHidden}
            toggleIsHidden={() => dispatch(toggleIsPasswordHidden())}
        />
    );
};

const SignUpRepeatPassword: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { repeatPassword } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <PasswordField
            theme={theme}
            title="Повторите пароль"
            value={repeatPassword.value}
            onChangingField={(data: string) => dispatch(editedRepeatPasswordField(data))}
            error={repeatPassword.error}
            isHidden={repeatPassword.isHidden}
            toggleIsHidden={() => dispatch(toggleIsRepeatPasswordHidden())}
        />
    );
};

const SignUpBio: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { bio } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    function handleChangingTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();

        dispatch(editedBioField(event.target.value));
    }

    return (
        <div className={'sign-up-bio' + (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)}>
            О себе
            <div className="sign-up-bio-field">
                <textarea
                    maxLength={BIO_MAX_LENGTH}
                    className="sign-up-bio__input"
                    placeholder="Что-то интересненькое..."
                    value={bio.value}
                    onChange={handleChangingTextarea}
                />
                <div className="sign-up-bio__length">
                    {bio.value.length}/{BIO_MAX_LENGTH}
                </div>
            </div>
        </div>
    );
};

const SignUpSkillToLearn: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { skills_to_learn, globalSkills, skillsToLearnError } = useSelector(
        (state: AppState) => state.signup,
    );
    const dispatch = useDispatch<AppDispatch>();

    return (
        <SkillToLayout
            theme={theme}
            skills={skills_to_learn}
            globalSkills={globalSkills}
            error={skillsToLearnError}
            title={'Выберите навыки для изучения'}
            addSkill={(name) => dispatch(addSkillToLearn(name))}
            deleteSkill={(name) => dispatch(deleteSkillFromLearn(name))}
            editedLevel={([index, name]) => dispatch(editedSkillToLearnLevel([index, name]))}
        />
    );
};

const SignUpSkillToShare: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { skills_to_share, globalSkills, skillsToShareError } = useSelector(
        (state: AppState) => state.signup,
    );
    const dispatch = useDispatch<AppDispatch>();

    return (
        <SkillToLayout
            theme={theme}
            skills={skills_to_share}
            globalSkills={globalSkills}
            error={skillsToShareError}
            title={'Выберите навыки, которому хотите обучать'}
            addSkill={(name) => dispatch(addSkillToShare(name))}
            deleteSkill={(name) => dispatch(deleteSkillFromShare(name))}
            editedLevel={([index, name]) => dispatch(editedSkillToShareLevel([index, name]))}
        />
    );
};

const SignUpNextStepButton: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { identifier, password, email, repeatPassword, hrefs } = useSelector(
        (state: AppState) => state.signup,
    );
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div
            className={
                'sign-up__button-next' + (theme === 'light' ? '' : ` ${theme}-mode__bright-block`)
            }
            onClick={() => {
                if (
                    identifier.error !== undefined ||
                    password.error !== undefined ||
                    repeatPassword.error !== undefined ||
                    email.error !== undefined ||
                    password.value === '' ||
                    identifier.value === '' ||
                    email.value === '' ||
                    repeatPassword.value === '' ||
                    hrefs.find((href) => href.error !== undefined)
                ) {
                    return;
                }

                dispatch(increaseStep());
            }}
        >
            Далее
        </div>
    );
};

const SignUpPreviousStepButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div
            className="sign-up__button-prev"
            onClick={() => {
                dispatch(decreaseStep());
            }}
        >
            Назад
        </div>
    );
};

const SignUpHrefs: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { hrefs } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch();

    return (
        <div className={'sign-up-hrefs' + (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)}>
            Личные ссылки
            <div className="sign-up-hrefs-examples">
                {hrefs.map((href: { value: string; error: string | undefined }, index: number) => {
                    return (
                        <div key={index} className="sign-up-hrefs-examples-item">
                            <div className="sign-up-hrefs-examples-item-field">
                                <input
                                    className="sign-up-hrefs-examples-item__input"
                                    type="text"
                                    value={href.value}
                                    onChange={(event) =>
                                        dispatch(
                                            changeHref({
                                                index,
                                                nextValue: event.target.value,
                                            }),
                                        )
                                    }
                                />
                                <img
                                    className={
                                        'sign-up-hrefs-examples-item__img' +
                                        (theme === 'light' ? '' : ` ${theme}-mode__img`)
                                    }
                                    src="/shared/cancel.png"
                                    alt="Удалить ссылку"
                                    onClick={() => dispatch(deleteHref(index))}
                                />
                            </div>
                            <div className="sign-up-hrefs-examples-item__error">
                                {href.error === undefined ? '' : href.error}
                            </div>
                        </div>
                    );
                })}
                {hrefs.length < MAX_HREFS_COUNT && (
                    <div
                        className="sign-up-hrefs-examples-add-href"
                        onClick={() => dispatch(addHref())}
                    >
                        <img
                            className={
                                'sign-up-hrefs-examples-add-href__img' +
                                (theme === 'light' ? '' : ` ${theme}-mode__img`)
                            }
                            src="/shared/plus.png"
                            alt="Добавить ссылку"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const SignUp: React.FC = () => {
    const { step } = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(GetCategories());
    }, [dispatch]);

    return (
        <div className="sign-up-page">
            <Helmet>
                <title>Регистрация</title>
            </Helmet>
            {step === 1 && (
                <>
                    <SignUpIdentifier />
                    <SignUpEmail />
                    <SignUpPassword />
                    <SignUpRepeatPassword />
                </>
            )}
            {step === 2 && (
                <>
                    <SignUpBio />
                    <SignUpAvatar />
                    <SignUpHrefs />
                </>
            )}
            {step === 3 && (
                <>
                    <SignUpSkillToLearn />
                    <SignUpSkillToShare />
                    <SignUpPreferredFormat />
                </>
            )}
            <div className="sign-up-footer">
                {(step === 2 || step === 3) && <SignUpPreviousStepButton />}
                {(step === 1 || step === 2) && <SignUpNextStepButton />}
                {step === 3 && <SignUpRegisterButton />}
            </div>
        </div>
    );
};

export default SignUp;
