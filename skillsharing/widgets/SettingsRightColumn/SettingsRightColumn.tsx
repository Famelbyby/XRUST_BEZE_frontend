import React, { useState } from "react";
import {ProfileType} from '../../pages/Profile/ui/ProfileTypes'

const BIO_MAX_LENGTH = 500;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 25;
const hrefsMock: string[] = [
    "https://github.com",
    "https://vk.com",
    "https://twitch.com",
];

interface SettingsRightColumnPropTypes {
    profile: ProfileType | undefined,
    setProfile: React.Dispatch<React.SetStateAction<ProfileType | undefined>>,
}

const SettingsRightColumn: React.FC<SettingsRightColumnPropTypes> = ({profile, setProfile}) => {
    const [hrefs, setHrefs] = useState(hrefsMock);

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

    function handleRemovingHref(hrefForDeleting: string) {
        const hrefIndex: number = hrefs.findIndex((href) => href === hrefForDeleting);

        setHrefs([...hrefs.slice(0, hrefIndex), ...hrefs.slice(hrefIndex + 1)]);
    }

    return (
        <div className="settings-right-column">
            <div className="settings-username">
                Имя
                <div className="settings-username-field">
                    <input minLength={USERNAME_MIN_LENGTH} maxLength={USERNAME_MAX_LENGTH} className="settings-username__input" type="text" placeholder="Ваше имя" value={profile === undefined ? '' : profile.username} onChange={handleChangingUsername} />
                    {profile === undefined && 
                        <>
                            0/{USERNAME_MAX_LENGTH}
                        </>
                    }
                    {profile !== undefined && 
                        <>
                            {profile.username.length}/{USERNAME_MAX_LENGTH}
                        </>
                    }
                </div>
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
            {profile &&
                <div className="settings-hrefs">
                    Ссылки
                    <div className="settings-hrefs-examples">
                        {hrefs.map((href: string, index: number) => {
                            return (
                                <div key={index} className="settings-hrefs-examples__href">
                                    <a href={href} target="_blank">
                                        {href}
                                    </a>
                                    <img className="settings-hrefs-examples__img" src="/Settings/cancel.png" alt="Удалить ссылку" onClick={() => handleRemovingHref(href)}/>
                                </div>
                            );
                        })}
                        <div className="settings-hrefs-examples-add-href" onClick={() => console.log('Oboudno')}>
                            <img className="settings-hrefs-examples-add-href__img" src="/shared/plus.png" alt="Добавить ссылку"/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SettingsRightColumn;