import React, { useState } from "react";
import './SettingsRightColumn.scss'
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/AppStore";
import { setBio, setUsername } from "../../app/slices/SettingsSlice";

const BIO_MAX_LENGTH = 500;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 25;
const hrefsMock: string[] = [
    "https://github.com",
    "https://vk.com",
    "https://twitch.com",
];

const SettingsRightColumn: React.FC = () => {
    const [hrefs, setHrefs] = useState(hrefsMock);
    const {user} = useSelector((state: AppState) => state.settings);
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
                    <input minLength={USERNAME_MIN_LENGTH} maxLength={USERNAME_MAX_LENGTH} className="settings-username__input" type="text" placeholder="Ваше имя" value={user === undefined ? '' : user.username} onChange={handleChangingUsername} />
                    {user === undefined && 
                        <>
                            0/{USERNAME_MAX_LENGTH}
                        </>
                    }
                    {user !== undefined && 
                        <>
                            {user.username.length}/{USERNAME_MAX_LENGTH}
                        </>
                    }
                </div>
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
            {user &&
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