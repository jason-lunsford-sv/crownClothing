import { CardElement } from '@stripe/react-stripe-js';

import {
    PaymentFormContainer,
    FormContainer
} from './payment-form.styles';

const PaymentForm = () => {
    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Card Payment: </h2>
                <CardElement />
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;