import React, {useEffect} from 'react';
import TextField from '../../features/TextField/TextField';
import PasswordField from '../../features/PasswordField/PasswordField';
import { useDispatch, useSelector } from 'react-redux';
import { editedAvatarField, editedEmailField, editedIdentifierField, editedPasswordField, editedRepeatPasswordField, toggleIsPasswordHidden, toggleIsRepeatPasswordHidden, setCommunicationFormat } from '../../app/slices/SignUpSlice';
import { AppDispatch, AppState } from '../../app/AppStore';
import './SignUp.scss';
import { LoadAvatar, TryRegister } from '../../pages/Auth/api/Auth';
import { PREFERRED_FORMAT_TRANSLATION, PREFERRED_FORMAT_TYPES } from '../../shared/Consts/Translations';
import { CommunicationFormat } from '../../shared/Consts/Interfaces';

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
    const {identifier, password, email, repeatPassword, avatar, preferred_format, isPending} = useSelector((state: AppState) => state.signup);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (avatar.URL !== undefined) {
            dispatch(TryRegister({username: identifier.value, email: email.value, password: password.value, avatar_url: avatar.URL, preferred_format}));
        }
    }, [avatar.URL, dispatch]);

    return (
        <div className="sign-up__button" onClick={() => {
            if (isPending) {
                return;
            }

            if (identifier.error !== undefined || password.error !== undefined || repeatPassword.error !== undefined || email.error !== undefined || password.value === "" || identifier.value === "" || email.value === "" || repeatPassword.value === "") {
                return;
            }

            if (avatar.URL === undefined && avatar.file !== undefined) {
                dispatch(LoadAvatar(avatar.file));
            } else {
                dispatch(TryRegister({username: identifier.value, email: email.value, password: password.value, avatar_url: avatar.URL, preferred_format}));
            }
        }}>
            {!isPending && 
                <>
                    Регистрация
                </>
            }
            {isPending && 
                <div className='sign-up__button_pending'>
                </div>
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

const SignUp: React.FC = () => {
    return (
        <div className='sign-up-page'>
            <SignUpIdentifier />
            <SignUpEmail />
            <SignUpPassword />
            <SignUpRepeatPassword />
            <SignUpAvatar />
            <SignUpPreferredFormat />
            <SignUpRegisterButton />
        </div>
    )
};

export default SignUp;