import { useState } from 'react';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.log('password mismatch');

            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();

        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('email address already in use');

                return;
            }

            console.log('error when creating account: ', error);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    required
                    onChange={handleChange}
                    value={displayName}
                    label='Display Name'
                />

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

                <FormInput
                    type="password"
                    name="confirmPassword"
                    required
                    onChange={handleChange}
                    value={confirmPassword}
                    label="Confirm Password"
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;