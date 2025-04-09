import React from "react";
import {PREFERRED_FORMAT_TRANSLATION, PREFERRED_FORMAT_TYPES} from '../../shared/Consts/Translations'
import {CommunicationFormat} from '../../shared/Consts/Interfaces'
import './SettingsLeftColumn.scss'
import { useDispatch, useSelector } from "react-redux";
import { setAvatar, setPreferredFormat } from "../../app/slices/SettingsSlice";
import { AppState } from "../../app/AppStore";
import { AVATAR_URL } from "../../shared/Consts/URLS";

const SettingsLeftColumn: React.FC = () => {
    const {user, avatar} = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch();

    function handleChangingSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();

        dispatch(setPreferredFormat(event.target.value as CommunicationFormat));
    }

    return (
        <div className="settings-left-column">
            <div className="settings-avatar">
                Аватар
                {user === undefined && 
                    <div className="settings-avatar-set settings-avatar-set-mock">
                        <div className="settings-avatar-set-spinner">
                        </div>
                    </div>
                }
                {user !== undefined &&
                    <>
                        <div className="settings-avatar-set" onClick={() => {
                            const fileInput = document.getElementById('avatar__input');

                            if (fileInput !== null) {
                                fileInput.click();
                            }
                        }}>
                            <img className="settings-avatar-set__img" src={avatar.file === undefined ? (AVATAR_URL + user.avatar) : URL.createObjectURL(avatar.file!)} alt="" />
                        </div>
                        <input id="avatar__input" type="file" className="settings-avatar__input" alt="" onChange={(event) => {
                            const fileInput = event.target;
                            
                            if (fileInput.files === null) {
                                return;
                            }

                            dispatch(setAvatar(fileInput.files[0]));
                        }}/>
                        {avatar.error !== undefined && 
                            <div className="settings-avatar__error">
                                {avatar.error}
                            </div>
                        }
                    </>
                }
            </div>
            <div className="settings-preferred-format">
                Предпочитаю общаться
                <select className="settings-preferred-format-select" onChange={handleChangingSelect}>
                    {PREFERRED_FORMAT_TYPES.map((format: CommunicationFormat) => {
                        if (user && user.preferred_format === format) {
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