import React from 'react';
import './SettingsRightColumn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import {
    addHrefSettings,
    addSkillToLearn,
    addSkillToShare,
    changeHrefSettings,
    deleteHrefSettings,
    deleteSkillFromLearn,
    deleteSkillFromShare,
    editedSkillToLearnLevel,
    editedSkillToShareLevel,
    setBio,
    setUsername,
} from '../../app/slices/SettingsSlice';
import {
    BIO_MAX_LENGTH,
    MAX_HREFS_COUNT,
    MAX_USERNAME_LENGTH,
    MIN_USERNAME_LENGTH,
} from '../../shared/Consts/ValidatorsConts';
import SkillToLayout from '../../features/SkillToLayout/SkillToLayout';

const SettingsSkillToLearn: React.FC = () => {
    const { user, globalSkills, skillsToLearnError } = useSelector(
        (state: AppState) => state.settings,
    );
    const dispatch = useDispatch<AppDispatch>();

    return (
        <SkillToLayout
            skills={user!.skills_to_learn}
            globalSkills={globalSkills}
            error={skillsToLearnError}
            title={'Выберите навыки для изучения'}
            addSkill={(name) => dispatch(addSkillToLearn(name))}
            deleteSkill={(name) => dispatch(deleteSkillFromLearn(name))}
            editedLevel={([index, name]) => dispatch(editedSkillToLearnLevel([index, name]))}
        />
    );
};

const SettingsSkillToShare: React.FC = () => {
    const { user, globalSkills, skillsToShareError } = useSelector(
        (state: AppState) => state.settings,
    );
    const dispatch = useDispatch<AppDispatch>();

    return (
        <SkillToLayout
            skills={user!.skills_to_share}
            globalSkills={globalSkills}
            error={skillsToShareError}
            title={'Выберите навыки, которому хотите обучать'}
            addSkill={(name) => dispatch(addSkillToShare(name))}
            deleteSkill={(name) => dispatch(deleteSkillFromShare(name))}
            editedLevel={([index, name]) => dispatch(editedSkillToShareLevel([index, name]))}
        />
    );
};

const SettingsBio: React.FC = () => {
    const { user, bioError } = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch();

    function handleChangingTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();

        dispatch(setBio(event.target.value));
    }

    return (
        <div className="settings-bio">
            О себе
            <div className="settings-bio-field">
                <textarea
                    maxLength={BIO_MAX_LENGTH}
                    className="settings-bio__input"
                    placeholder="Что-то интересненькое..."
                    value={user === undefined ? '' : user.bio}
                    onChange={handleChangingTextarea}
                />
                <div className="settings-bio__length">
                    {user === undefined ? 0 : user.bio.length}/{BIO_MAX_LENGTH}
                </div>
            </div>
            {bioError !== undefined && (
                <div className="settings-username-field__error">{bioError}</div>
            )}
        </div>
    );
};

const SettingsHrefs: React.FC = () => {
    const { hrefs } = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch();

    return (
        <div className="settings-hrefs">
            Ссылки
            <div className="settings-hrefs-examples">
                {hrefs.map((href: { value: string; error: string | undefined }, index: number) => {
                    return (
                        <div key={index} className="settings-hrefs-examples-item">
                            <div className="settings-hrefs-examples-item-field">
                                <input
                                    className="settings-hrefs-examples-item__input"
                                    type="text"
                                    value={href.value}
                                    onChange={(event) =>
                                        dispatch(
                                            changeHrefSettings({
                                                index,
                                                nextValue: event.target.value,
                                            }),
                                        )
                                    }
                                />
                                <img
                                    className="settings-hrefs-examples-item__img"
                                    src="/shared/cancel.png"
                                    alt="Удалить ссылку"
                                    onClick={() => dispatch(deleteHrefSettings(index))}
                                />
                            </div>
                            <div className="settings-hrefs-examples-item__error">
                                {href.error === undefined ? '' : href.error}
                            </div>
                        </div>
                    );
                })}
                {hrefs.length < MAX_HREFS_COUNT && (
                    <div
                        className="settings-hrefs-examples-add-href"
                        onClick={() => dispatch(addHrefSettings())}
                    >
                        <img
                            className="settings-hrefs-examples-add-href__img"
                            src="/shared/plus.png"
                            alt="Добавить ссылку"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const SettingsUsername: React.FC = () => {
    const { user, usernameError } = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch();

    function handleChangingUsername(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        dispatch(setUsername(event.target.value));
    }

    return (
        <div className="settings-username">
            Имя
            <div className="settings-username-field">
                <input
                    minLength={MIN_USERNAME_LENGTH}
                    maxLength={MAX_USERNAME_LENGTH}
                    className="settings-username__input"
                    type="text"
                    placeholder="Ваше имя"
                    value={user === undefined ? '' : user.username}
                    onChange={handleChangingUsername}
                />
                {user === undefined && <>0/{MAX_USERNAME_LENGTH}</>}
                {user !== undefined && (
                    <>
                        {user.username.length}/{MAX_USERNAME_LENGTH}
                    </>
                )}
            </div>
            {usernameError !== undefined && (
                <div className="settings-username-field__error">{usernameError}</div>
            )}
        </div>
    );
};

const SettingsRightColumn: React.FC = () => {
    return (
        <div className="settings-right-column">
            <SettingsUsername />
            <SettingsBio />
            <SettingsSkillToLearn />
            <SettingsSkillToShare />
            <SettingsHrefs />
        </div>
    );
};

export default SettingsRightColumn;
