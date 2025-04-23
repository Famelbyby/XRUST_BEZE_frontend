import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editedIdentifierField, editedPasswordField, toggleIsPasswordHidden } from "../../app/slices/LogInSlice";
import { AppDispatch, AppState } from "../../app/AppStore";
import TextField from "../../features/TextField/TextField";
import PasswordField from '../../features/PasswordField/PasswordField'
import './LogIn.scss'
import { TryAuth} from '../../pages/Auth/api/Auth'
import Loader from '../../features/Loader/Loader'
import { Helmet } from "react-helmet";

const LogInEnterButton: React.FC = () => {
    const {identifier, password, isPending, isEmailValid} = useSelector((state: AppState) => state.login);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="log-in__button" onClick={() => {
            if (isPending) {
                return;
            }

            if (identifier.error !== undefined || password.error !== undefined || password.value === "" || identifier.value === "") {
                return;
            }

            if (isEmailValid) {
                dispatch(TryAuth({email: identifier.value, password: password.value, username: ""}));
            } else {
                dispatch(TryAuth({username: identifier.value, password: password.value, email: ""}));
            }
            
        }}>
            {isPending && 
                <Loader />
            }
            {!isPending &&
                <>
                    Войти
                </>
            }
        </div>
    );
};

const LogInIdentifier: React.FC = () => {
    const {identifier} = useSelector((state: AppState) => state.login);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <TextField title="Почта или имя" value={identifier.value} error={identifier.error} onChangingField={(data: string) => dispatch(editedIdentifierField(data))} placeholder="coolboy@always.com"/>
    )
};

const LogInPassword: React.FC = () => {
    const {password} = useSelector((state: AppState) => state.login);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <PasswordField title="Пароль" value={password.value} onChangingField={(data: string) => dispatch(editedPasswordField(data))} error={password.error} isHidden={password.isHidden} toggleIsHidden={() => dispatch(toggleIsPasswordHidden())} />
    );
}

const LogIn: React.FC = () => {
    return (
        <div className="log-in-page">
            <Helmet>
                <title>Авторизация</title>
            </Helmet>
            <LogInIdentifier />
            <LogInPassword />
            <LogInEnterButton />
        </div>
    )
};

export default LogIn;