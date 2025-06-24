import React from 'react';
import './PasswordField.scss';

interface PasswordFieldPropTypes<Type> {
    title: string;
    onChangingField: (value: string) => void;
    value: Type;
    toggleIsHidden: () => void;
    error: string | undefined;
    isHidden: boolean;
    theme?: string;
}

const TextField: React.FC<PasswordFieldPropTypes<string>> = ({
    title,
    onChangingField,
    value,
    toggleIsHidden,
    isHidden,
    error,
    theme = 'light',
}) => {
    return (
        <div
            className={'password-field' + (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)}
        >
            {title}
            <div className={'password-field-content'}>
                <input
                    type={isHidden ? 'password' : 'text'}
                    className={
                        'password-field-content__input' +
                        (error
                            ? ' password-field-content__input_errored' +
                              ` ${theme}-mode__error-border`
                            : '')
                    }
                    placeholder=""
                    value={value}
                    autoComplete="off"
                    onChange={(event) => {
                        onChangingField(event.target.value);
                    }}
                />
                <img
                    className="password-field__eye-img"
                    src={'/AuthPage/' + (isHidden ? '' : 'closed-') + 'eye.png'}
                    alt={isHidden ? 'Show password' : 'Hide password'}
                    onClick={toggleIsHidden}
                />
            </div>
            <div className={'password-field__error' + ` ${theme}-mode__error-text`}>
                {error === undefined ? '' : error}
            </div>
        </div>
    );
};

export default TextField;
