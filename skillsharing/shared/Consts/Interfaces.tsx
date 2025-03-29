export interface TextFieldState {
    value: string,
    error: string | undefined,
}

export interface PasswordFieldState extends TextFieldState{
    isHidden: boolean,
}