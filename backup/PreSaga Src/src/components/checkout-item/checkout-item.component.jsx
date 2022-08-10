import { useDispatch, useSelector } from 'react-redux';

import {
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart

} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price, quantity } = cartItem;

    const handleDelete = () => {
        dispatch(deleteItemFromCart(cartItems, cartItem));
    }

    const handleAddItem = () => {
        dispatch(addItemToCart(cartItems, cartItem));
    }

    const handleRemoveItem = () => {
        dispatch(removeItemFromCart(cartItems, cartItem));
    }

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>

            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={handleRemoveItem}>&#10094;</span>
                <span className="value">{quantity}</span>
                <span className="arrow" onClick={handleAddItem}>&#10095;</span>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={handleDelete}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;