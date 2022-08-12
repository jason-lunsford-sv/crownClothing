import { useSelector } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import { selectCartTotal } from '../../store/cart/cart.selector';

import {
    CheckoutWrapper,
    CheckoutContainer,
    CheckoutDetails,
    Total
} from './checkout.styles';

const Checkout = () => {
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutWrapper>
            <CheckoutContainer>
                <PaymentForm />
            </CheckoutContainer>
            <CheckoutDetails>
                <Total>Total: ${cartTotal}</Total>
                <Button
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >
                    Pay Now
                </Button>
            </CheckoutDetails>
        </CheckoutWrapper>
    );
};

export default Checkout;