import React, {useEffect} from 'react';
import TextField from '../../features/TextField/TextField';
import PasswordField from '../../features/PasswordField/PasswordField';
import { useDispatch, useSelector } from 'react-redux';
import { editedAvatarField, editedEmailField, editedIdentifierField, editedPasswordField, editedRepeatPasswordField, toggleIsPasswordHidden, toggleIsRepeatPasswordHidden, setCommunicationFormat, editedBioField, addSkillToLearn, deleteSkillFromLearn, editedSkillToLearn, editedSkillToLearnLevel, editedSkillToShare, editedSkillToShareLevel, addSkillToShare, deleteSkillFromShare, increaseStep, decreaseStep } from '../../app/slices/SignUpSlice';
import { AppDispatch, AppState } from '../../app/AppStore';
import './SignUp.scss';
import { GetCategories, LoadAvatar, TryRegister } from '../../pages/Auth/api/Auth';
import { PREFERRED_FORMAT_TRANSLATION, PREFERRED_FORMAT_TYPES } from '../../shared/Consts/Translations';
import { CommunicationFormat } from '../../shared/Consts/Interfaces';
import { BIO_MAX_LENGTH } from '../../shared/Consts/ValidatorsConts';
import Loader from '../../features/Loader/Loader';

const SignUpAvatar: React.FC = () => {
    const {avatar} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch();

    return (
        <div className='sign-up-avatar'>
            Выберите аватарку
            <div className='sign-up-avatar-field'>
                <img className={'sign-up-avatar__preview' + (avatar.file === undefined ? " sign-up-avatar_filtered" : '')} src={avatar.file === undefined ? '/Auth/default_avatar.png' : URL.createObjectURL(avatar.file)} alt='Preview' onClick={() => {
                    const avatarInput = document.querySelector('.sign-up-avatar__input') as HTMLElement;

                    if (avatarInput !== null) {
                        avatarInput.click();
                    }
                }}/>
            </div>
            <input type='file' className='sign-up-avatar__input' accept='image/png, image/jpeg, image/jpg, image/webp' onChange={(event) => {
                const inputFiles = event.target.files;

                if (inputFiles === null) {
                    return;
                }

                dispatch(editedAvatarField(inputFiles[0]));
            }}/>
            <div className='sign-up-avatar__error'>
                {avatar.error === undefined ? '' : avatar.error}
            </div>
        </div>
    );
};

const SignUpPreferredFormat: React.FC = () => {
    const {preferred_format} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch();

    return (
        <div className="sign-up-preferred-format">
            Предпочитаю общаться
            <select className="sign-up-preferred-format-select" onChange={(event) => {
                dispatch(setCommunicationFormat(event.target.value as CommunicationFormat));
            }}>
                {PREFERRED_FORMAT_TYPES.map((format: CommunicationFormat) => {
                    if (preferred_format === format) {
                        return (
                            <option selected className="sign-up-preferred-formata-select__option" value={format} key={format}>
                                {PREFERRED_FORMAT_TRANSLATION[format]}
                            </option>
                        );
                    } else {
                        return (
                            <option className="sign-up-preferred-formata-select__option" value={format} key={format}>
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
    const {identifier, password, email, repeatPassword, avatar, preferred_format, isPending, bio, skills_to_learn, skills_to_share} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (avatar.URL !== undefined) {
            dispatch(TryRegister({skills_to_learn, skills_to_share, username: identifier.value, email: email.value, password: password.value, avatar_url: avatar.URL, preferred_format, bio: bio.value}));
        }
    }, [avatar.URL, dispatch]);

    return (
        <div className="sign-up__button-reg" onClick={() => {
            if (isPending) {
                return;
            }

            if (identifier.error !== undefined || password.error !== undefined || repeatPassword.error !== undefined || email.error !== undefined || password.value === "" || identifier.value === "" || email.value === "" || repeatPassword.value === "") {
                return;
            }

            if (avatar.URL === undefined && avatar.file !== undefined) {
                dispatch(LoadAvatar({avatar: avatar.file}));
            } else {
                dispatch(TryRegister({skills_to_learn, skills_to_share, username: identifier.value, email: email.value, password: password.value, avatar_url: avatar.URL, preferred_format, bio: bio.value}));
            }
        }}>
            {!isPending && 
                <>
                    Создать аккаунт
                </>
            }
            {isPending && 
                <Loader />
            }
        </div>
    )
};

const SignUpIdentifier: React.FC = () => {
    const {identifier} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <TextField title='Имя' value={identifier.value} error={identifier.error} onChangingField={(data: string) => dispatch(editedIdentifierField(data))} placeholder='PlayBoy'/>
    );
};

const SignUpEmail: React.FC = () => {
    const {email} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <TextField title="Почта" value={email.value} error={email.error} onChangingField={(data: string) => dispatch(editedEmailField(data))} placeholder='coolboy@always.com'/>
    );
};

const SignUpPassword: React.FC = () => {
    const {password} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <PasswordField title="Пароль" value={password.value} onChangingField={(data: string) => dispatch(editedPasswordField(data))} error={password.error} isHidden={password.isHidden} toggleIsHidden={() => dispatch(toggleIsPasswordHidden())} />
    );
};

const SignUpRepeatPassword: React.FC = () => {
    const {repeatPassword} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <PasswordField title="Повторите пароль" value={repeatPassword.value} onChangingField={(data: string) => dispatch(editedRepeatPasswordField(data))} error={repeatPassword.error} isHidden={repeatPassword.isHidden} toggleIsHidden={() => dispatch(toggleIsRepeatPasswordHidden())} />
    );
};

const SignUpBio: React.FC = () => {
    const {bio} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    function handleChangingTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        
        dispatch(editedBioField(event.target.value));
    }

    return (
        <div className="sign-up-bio">
            О себе
            <div className="sign-up-bio-field">
                <textarea maxLength={BIO_MAX_LENGTH} className="sign-up-bio__input" placeholder="Что-то интересненькое..." value={bio.value} onChange={handleChangingTextarea}/>
                <div className="sign-up-bio__length">
                    {bio.value.length}/{BIO_MAX_LENGTH}
                </div>
            </div>
        </div>
    );
};

const SignUpSkillToLearn: React.FC = () => {
    const {skills_to_learn, globalSkills} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className='sign-up-sktl'>
            Выберите навыки для изучения
            <div className='sign-up-sktl-cases'>
                {skills_to_learn.map((skill, index) => {
                    return (
                        <div className='sign-up-sktl-case' key={index}>
                            <select className='sign-up-sktl-case-select-skill' onChange={(event) => {
                                dispatch(editedSkillToLearn([index, event.target.value]));
                            }}>
                                {globalSkills.map((glSkill) => {
                                    return (
                                        <>
                                            {glSkill === skill.name && 
                                                <option value={glSkill} selected key={index}>{glSkill}</option>
                                            }
                                            {glSkill !== skill.name && 
                                                <option value={glSkill} key={index}>{glSkill}</option>
                                            }
                                        </>
                                    )
                                })}
                            </select>
                            <select className='sign-up-sktl-case-select-level' onChange={(event) => {
                                dispatch(editedSkillToLearnLevel([index, event.target.value]));
                            }}>
                                {["beginner", "intermediate", "advanced"].map((level) => {
                                    return (
                                        <>
                                            {level === skill.level && 
                                                <option value={level} selected key={index}>{level}</option>
                                            }
                                            {level !== skill.level && 
                                                <option value={level} key={index}>{level}</option>
                                            }
                                        </>
                                    )
                                })}
                            </select>
                            {(skills_to_learn.length === 1) && 
                                <img className='sign-up-sktl-case__delete-img' src='/shared/cancel.png' alt='Удалить навык' onClick={() => dispatch(deleteSkillFromLearn(skill.name))}/>
                            }
                        </div>
                    )
                })}
                {skills_to_learn.length < 5 && 
                    <div className='sign-up-sktl-cases-add-skill' onClick={() => dispatch(addSkillToLearn())}>
                        <img className='sign-up-sktl-cases-add-skill__img' src='/shared/plus.png' alt='Добавить навык для изучения'/>
                    </div>
                }
            </div>
        </div>
    )
};

const SignUpSkillToShare: React.FC = () => {
    const {skills_to_share, globalSkills} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className='sign-up-sktl'>
            Выберите навыки, которому хотите обучиться
            <div className='sign-up-sktl-cases'>
                {skills_to_share.map((skill, index) => {
                    return (
                        <div className='sign-up-sktl-case' key={index}>
                            <select className='sign-up-sktl-case-select-skill' onChange={(event) => {
                                dispatch(editedSkillToShare([index, event.target.value]));
                            }}>
                                {globalSkills.map((glSkill) => {
                                    return (
                                        <>
                                            {glSkill === skill.name && 
                                                <option value={glSkill} selected key={index}>{glSkill}</option>
                                            }
                                            {glSkill !== skill.name && 
                                                <option value={glSkill} key={index}>{glSkill}</option>
                                            }
                                        </>
                                    )
                                })}
                            </select>
                            <select className='sign-up-sktl-case-select-level' onChange={(event) => {
                                dispatch(editedSkillToShareLevel([index, event.target.value]));
                            }}>
                                {["beginner", "intermediate", "advanced"].map((level) => {
                                    return (
                                        <>
                                            {level === skill.level && 
                                                <option value={level} selected key={index}>{level}</option>
                                            }
                                            {level !== skill.level && 
                                                <option value={level} key={index}>{level}</option>
                                            }
                                        </>
                                    )
                                })}
                            </select>
                            {(skills_to_share.length === 1) && 
                                <img className='sign-up-sktl-case__delete-img' src='/shared/cancel.png' alt='Удалить навык' onClick={() => dispatch(deleteSkillFromShare(skill.name))}/>
                            }
                        </div>
                    )
                })}
                {skills_to_share.length < 5 && 
                    <div className='sign-up-sktl-cases-add-skill' onClick={() => dispatch(addSkillToShare())}>
                        <img className='sign-up-sktl-cases-add-skill__img' src='/shared/plus.png' alt='Добавить навык для изучения'/>
                    </div>
                }
            </div>
        </div>
    )
};

const SignUpNextStepButton: React.FC = () => {
    const {identifier, password, email, repeatPassword, avatar} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="sign-up__button-next" onClick={() => {
            if (identifier.error !== undefined || password.error !== undefined || repeatPassword.error !== undefined || email.error !== undefined || password.value === "" || identifier.value === "" || email.value === "" || repeatPassword.value === "") {
                return;
            }

            if (avatar.URL === undefined && avatar.file !== undefined) {
                dispatch(LoadAvatar({avatar: avatar.file}));
            } else {
                dispatch(increaseStep());
            }
        }}>
            Далее
        </div>
    )
};

const SignUpPreviousStepButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="sign-up__button-prev" onClick={() => {
            dispatch(decreaseStep());
        }}>
            Назад
        </div>
    )
};

const SignUp: React.FC = () => {
    const {step} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(GetCategories());
    }, [dispatch]);

    return (
        <div className='sign-up-page'>
            {step === 1 && 
                <>
                    <SignUpIdentifier />
                    <SignUpEmail />
                    <SignUpPassword />
                    <SignUpRepeatPassword />
                </>
            }
            {step === 2 && 
                <>
                    <SignUpBio />
                    <SignUpAvatar />
                    <SignUpPreferredFormat />
                </>
            }
            {step === 3 && 
                <>
                    <SignUpSkillToLearn />
                    <SignUpSkillToShare />
                </>
            }
            <div className='sign-up-footer'>
                {(step === 2 || step === 3) && 
                    <SignUpPreviousStepButton />
                }
                {(step === 1 || step === 2) && 
                    <SignUpNextStepButton />
                }
                {step === 3 && 
                    <SignUpRegisterButton />
                }
            </div>
        </div>
    )
};

export default SignUp;