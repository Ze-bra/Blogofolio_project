export type FormButtonType = {
    text?: string
    onClick?: () => void
    disabled?: boolean | undefined;
    type?: 'submit' | 'reset' | 'button' | undefined;
    style?: string
    className?:string
}