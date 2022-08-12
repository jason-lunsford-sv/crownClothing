import { useSelector } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import {
    CheckoutWrapper,
    CheckoutDetails,
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total
} from './checkout.styles';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutWrapper>
            <CheckoutContainer>
                <CheckoutHeader>
                    <HeaderBlock>
                        <span>Product</span>
                    </HeaderBlock>
                    <HeaderBlock>
                        <span>Description</span>
                    </HeaderBlock>
                    <HeaderBlock>
                        <span>Quantity</span>
                    </HeaderBlock>
                    <HeaderBlock>
                        <span>Price</span>
                    </HeaderBlock>
                    <HeaderBlock>
                        <span>Remove</span>
                    </HeaderBlock>
                </CheckoutHeader>
                {
                    cartItems.map(cartItem => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    ))
                }
            </CheckoutContainer>
            <CheckoutDetails>
                <Total>Total: ${cartTotal}</Total>
                <Button
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >
                    Check Out
                </Button>
            </CheckoutDetails>
        </CheckoutWrapper>
    );
};

export default Checkout;