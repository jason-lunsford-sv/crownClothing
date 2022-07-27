import { useState } from 'react';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();

        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);

            console.log('response: ', response);
            resetFormFields();

        } catch(error) {
            if (error.code === 'auth/wrong-password') {
                alert('Incorrect password.');

                return;
            }

            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password.');

                    break;
                case 'auth/user-not-found':
                    alert('Unknown email entered.');

                    break;
                default:
                    console.log('sign in error occurred: ', error);
            }
        }
    }

    return (
        <div className="sign-in-container">
            <h2>Alread have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={email}
                    label="Email"
                />

                <FormInput
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    value={password}
                    label="Password"
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                        buttonType="google"
                        onClick={signInWithGoogle}
                        type="button"
                    >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;