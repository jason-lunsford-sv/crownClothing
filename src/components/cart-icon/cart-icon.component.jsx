import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount } from '../../store/cart/cart.selector';
import { setCartOpen } from '../../store/cart/cart.action';

import {
    CartIconContainer,
    ShoppingIcon,
    ItemCount
} from './cart-icon.styles';

const CartIcon = () => {
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();

    const toggleIsCartOpen = () => {
        dispatch(setCartOpen());
    };

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;