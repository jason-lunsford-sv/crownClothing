import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import {
    CartWrapper,
    CartDetails,
    CartContainer,
    CartHeader,
    HeaderBlock,
    Total
} from './cart.styles';

const Cart = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const navigate = useNavigate();

    const handleClick = event => {
        event.preventDefault();
        
        navigate('/checkout');
    }

    return (
        <CartWrapper>
            <CartContainer>
                <CartHeader>
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
                </CartHeader>
                {
                    cartItems.map(cartItem => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    ))
                }
            </CartContainer>
            <CartDetails>
                <Total>Total: ${cartTotal}</Total>
                <Button
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    onClick={handleClick}
                >
                    Check Out
                </Button>
            </CartDetails>
        </CartWrapper>
    );
};

export default Cart;