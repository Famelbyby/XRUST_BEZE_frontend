import React from 'react';
import './TextField.scss';

interface TextFieldPropTypes<Type> {
    title: string;
    onChangingField: (value: string) => void;
    value: Type;
    error: string | undefined;
    placeholder: string;
}

const TextField: React.FC<TextFieldPropTypes<string>> = ({
    title,
    onChangingField,
    value,
    error,
    placeholder,
}) => {
    return (
        <div className="text-field">
            {title}
            <div className="text-field-content">
                <input
                    type="text"
                    className={
                        'text-field-content__input' +
                        (error === undefined ? '' : ' text-field-content__input_errored')
                    }
                    placeholder={placeholder}
                    value={value}
                    autoComplete="off"
                    onChange={(event) => {
                        onChangingField(event.target.value);
                    }}
                />
            </div>
            <div className="text-field__error">{error === undefined ? '' : error}</div>
        </div>
    );
};

export default TextField;
