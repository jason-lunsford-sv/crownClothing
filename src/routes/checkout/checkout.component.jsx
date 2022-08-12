import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import {
    CheckoutWrapper,
    CheckoutContainer,
    CheckoutDetails,
    Total
} from './checkout.styles';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [ isProcessingPayment, setIsProcessingPayment ] = useState(false);

    const handlePayment = async event => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert('payment error!');
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('payment successful');
            }
        }
    };

    return (
        <CheckoutWrapper>
            <CheckoutContainer>
                <PaymentForm />
            </CheckoutContainer>
            <CheckoutDetails>
                <Total>Total: ${amount}</Total>
                <Button
                    onClick={handlePayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    isLoading={isProcessingPayment}
                >
                    Pay Now
                </Button>
            </CheckoutDetails>
        </CheckoutWrapper>
    );
};

export default Checkout;