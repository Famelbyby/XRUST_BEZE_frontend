import React from "react";
import {ProfileType} from '../../pages/Profile/ui/ProfileTypes'

const BIO_MAX_LENGTH = 500;

interface SettingsRightColumnPropTypes {
    profile: ProfileType | undefined,
    setProfile: React.Dispatch<React.SetStateAction<ProfileType | undefined>>,
}

const SettingsRightColumn: React.FC<SettingsRightColumnPropTypes> = ({profile, setProfile}) => {
    function handleChangingUsername(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        if (profile !== undefined) {
            setProfile({...profile, username: event.target.value});
        }
    }

    function handleChangingTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        
        if (profile !== undefined) {
            setProfile({...profile, bio: event.target.value})
        }
}

    return (
        <div className="settings-right-column">
            <div className="settings-username">
                Имя
                <input className="settings-username__input" type="text" placeholder="Ваше имя" value={profile === undefined ? '' : profile.username} onChange={handleChangingUsername} />
            </div>
            <div className="settings-bio">
                О себе
                <div className="settings-bio-field">
                    <textarea maxLength={BIO_MAX_LENGTH} className="settings-bio__input" placeholder="Что-то интересненькое..." value={profile === undefined ? '' : profile.bio} onChange={handleChangingTextarea}/>
                    <div className="settings-bio__length">
                        {profile === undefined ? 0 : profile.bio.length}/{BIO_MAX_LENGTH}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsRightColumn;