import React from "react";
import {ProfileType} from '../../pages/Profile/ui/ProfileTypes'
import { CommunicationFormat } from "../ProfileLeftColumn/ProfileLeftColumnTypes";
import {PREFERRED_FORMAT_TRANSLATION} from '../../shared/Consts/Translations'

const PREFERRED_FORMAT_TYPES: CommunicationFormat[] = [
    "text",
    "video",
    "voice",
]

interface SettingsLeftColumnPropTypes {
    profile: ProfileType | undefined,
    setProfile: React.Dispatch<React.SetStateAction<ProfileType | undefined>>,
}

const SettingsLeftColumn: React.FC<SettingsLeftColumnPropTypes> = ({profile, setProfile}) => {
    function handleChangingSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();

        if (profile !== undefined) {
            setProfile({...profile, preferred_format: event.target.value as CommunicationFormat})
        }
    }

    return (
        <div className="settings-left-column">
            <div className="settings-avatar">
                Аватар
                {profile === undefined && 
                    <div className="settings-avatar-set settings-avatar-set-mock">
                        <div className="settings-avatar-set-spinner">
                        </div>
                    </div>
                }
                {profile !== undefined &&
                    <>
                        <div className="settings-avatar-set" onClick={() => {
                            const fileInput = document.getElementById('avatar__input');

                            if (fileInput !== null) {
                                fileInput.click();
                            }
                        }}>
                            <div className="settings-avatar-set-add-img">
                                <img className="settings-avatar-set-add-img__img" src="/shared/plus.png" alt="" />
                            </div>
                            <img className="settings-avatar-set__img" src={profile.avatar_url} alt="" />
                        </div>
                        <input id="avatar__input" type="file" className="settings-avatar__input" alt="" />
                    </>
                }
            </div>
            <div className="settings-skills-to-share">
                Теги
                <img className="profile-tags-header__img" title="Выберите навыки, которыми можете поделиться с другими" src="/shared/question.png" alt=""/>
            </div>
            <div className="settings-preferred-format">
                Предпочитаю общаться
                <select className="settings-preferred-format-select" onChange={handleChangingSelect}>
                    {PREFERRED_FORMAT_TYPES.map((format: CommunicationFormat) => {
                        if (profile && profile.preferred_format === format) {
                            return (
                                <option selected className="settings-preferred-formata-select__option" value={format} key={format}>
                                    {PREFERRED_FORMAT_TRANSLATION[format]}
                                </option>
                            );
                        } else {
                            return (
                                <option className="settings-preferred-formata-select__option" value={format} key={format}>
                                    {PREFERRED_FORMAT_TRANSLATION[format]}
                                </option>
                            );
                        }
                    })}
                </select>
            </div>
        </div>
    );
}

export default SettingsLeftColumn;