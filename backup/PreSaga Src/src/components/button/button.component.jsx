import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton
} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    // suuuuuuper clever way to dynamically return a component based on a 
    // hash map, referencing another hash map developers should use to prevent
    // "fat fingering"
    // ex: <Button buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]
);

const Button = ({ buttonType, children, ...props }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton {...props}>
            {children}
        </CustomButton>
    )
};

export default Button;