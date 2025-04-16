import React from 'react';
import './PasswordField.scss'

interface PasswordFieldPropTypes<Type> {
    title: string,
    onChangingField: (value: string) => void,
    value: Type,
    toggleIsHidden: () => void,
    error: string | undefined;
    isHidden: boolean,
}

const TextField: React.FC<PasswordFieldPropTypes<string>> = ({title, onChangingField, value, toggleIsHidden, isHidden, error}) => {
    return (
        <div className="password-field">
            {title}
            <div className={"password-field-content" + (error ? " password-field-content_errored": "")}>
                <input type={isHidden ? "password" : "text"} className="password-field-content__input" placeholder="" value={value} autoComplete="off" onChange={(event) => {
                    onChangingField(event.target.value);
                }}/>
                <img className="password-field__eye-img" src={"/AuthPage/" + (isHidden ? "" : "closed-") + "eye.png"} alt={isHidden ? "Show password" : "Hide password"} onClick={toggleIsHidden}/>
            </div>
            <div className="password-field__error">
                {error === undefined ? "" : error} 
            </div>
        </div>
    );
};

export default TextField;