import React, { useState } from "react";
import './SettingsRightColumn.scss'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/AppStore";
import { addSkillToLearn, addSkillToShare, deleteSkillFromLearn, deleteSkillFromShare, editedSkillToLearn, editedSkillToLearnLevel, editedSkillToShare, editedSkillToShareLevel, setBio, setUsername } from "../../app/slices/SettingsSlice";
import { BIO_MAX_LENGTH, MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from "../../shared/Consts/ValidatorsConts";

const hrefsMock: string[] = [
    "https://github.com",
    "https://vk.com",
    "https://twitch.com",
];

const SettingsSkillToLearn: React.FC = () => {
    const {user, globalSkills} = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className='sign-up-sktl'>
            Выберите навыки для изучения
            <div className='sign-up-sktl-cases'>
                {user !== undefined && user.skills_to_learn.map((skill, index) => {
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
                            {!(user.skills_to_learn.length === 1) && 
                                <img className='sign-up-sktl-case__delete-img' src='/shared/cancel.png' alt='Удалить навык' onClick={() => dispatch(deleteSkillFromLearn(skill.name))}/>
                            }
                        </div>
                    )
                })}
                {user !== undefined && user.skills_to_learn.length < 5 && 
                    <div className='sign-up-sktl-cases-add-skill' onClick={() => dispatch(addSkillToLearn())}>
                        <img className='sign-up-sktl-cases-add-skill__img' src='/shared/plus.png' alt='Добавить навык для изучения'/>
                    </div>
                }
            </div>
        </div>
    )
};

const SettingsSkillToShare: React.FC = () => {
    const {user, globalSkills} = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className='sign-up-sktl'>
            Выберите навыки, которыми хотите обучать
            <div className='sign-up-sktl-cases'>
                {user !== undefined && user.skills_to_share.map((skill, index) => {
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
                            {!(user.skills_to_share.length === 1) && 
                                <img className='sign-up-sktl-case__delete-img' src='/shared/cancel.png' alt='Удалить навык' onClick={() => dispatch(deleteSkillFromShare(skill.name))}/>
                            }
                        </div>
                    )
                })}
                {user !== undefined && user.skills_to_share.length < 5 && 
                    <div className='sign-up-sktl-cases-add-skill' onClick={() => dispatch(addSkillToShare())}>
                        <img className='sign-up-sktl-cases-add-skill__img' src='/shared/plus.png' alt='Добавить навык для обучения'/>
                    </div>
                }
            </div>
        </div>
    )
};

const SettingsRightColumn: React.FC = () => {
    const [hrefs, setHrefs] = useState(hrefsMock);
    const {user, usernameError} = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch();

    function handleChangingUsername(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        dispatch(setUsername(event.target.value));
    }

    function handleChangingTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        
        dispatch(setBio(event.target.value));
    }

    function handleRemovingHref(hrefForDeleting: string) {
        const hrefIndex: number = hrefs.findIndex((href) => href === hrefForDeleting);

        setHrefs([...hrefs.slice(0, hrefIndex), ...hrefs.slice(hrefIndex + 1)]);
    }

    return (
        <div className="settings-right-column">
            <div className="settings-username">
                Имя
                <div className="settings-username-field">
                    <input minLength={MIN_USERNAME_LENGTH} maxLength={MAX_USERNAME_LENGTH} className="settings-username__input" type="text" placeholder="Ваше имя" value={user === undefined ? '' : user.username} onChange={handleChangingUsername} />
                    {user === undefined && 
                        <>
                            0/{MAX_USERNAME_LENGTH}
                        </>
                    }
                    {user !== undefined && 
                        <>
                            {user.username.length}/{MAX_USERNAME_LENGTH}
                        </>
                    }
                </div>
                {usernameError !== undefined &&
                    <div className="settings-username-field__error">
                        {usernameError}
                    </div>
                }
            </div>
            <div className="settings-bio">
                О себе
                <div className="settings-bio-field">
                    <textarea maxLength={BIO_MAX_LENGTH} className="settings-bio__input" placeholder="Что-то интересненькое..." value={user === undefined ? '' : user.bio} onChange={handleChangingTextarea}/>
                    <div className="settings-bio__length">
                        {user === undefined ? 0 : user.bio.length}/{BIO_MAX_LENGTH}
                    </div>
                </div>
            </div>
            <SettingsSkillToLearn />
            <SettingsSkillToShare />
            {/* {user &&
                <div className="settings-hrefs">
                    Ссылки
                    <div className="settings-hrefs-examples">
                        {hrefs.map((href: string, index: number) => {
                            return (
                                <div key={index} className="settings-hrefs-examples__href">
                                    <a href={href} target="_blank">
                                        {href}
                                    </a>
                                    <img className="settings-hrefs-examples__img" src="/shared/cancel.png" alt="Удалить ссылку" onClick={() => handleRemovingHref(href)}/>
                                </div>
                            );
                        })}
                        <div className="settings-hrefs-examples-add-href" onClick={() => console.log('Oboudno')}>
                            <img className="settings-hrefs-examples-add-href__img" src="/shared/plus.png" alt="Добавить ссылку"/>
                        </div>
                    </div>
                </div>
            } */}
        </div>
    );
};

export default SettingsRightColumn;