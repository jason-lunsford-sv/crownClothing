import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { deleteItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    const handleDelete = () => {
        deleteItemFromCart(cartItem)
    }

    const handleAddItem = () => {
        addItemToCart(cartItem);
    }

    const handleRemoveItem = () => {
        removeItemFromCart(cartItem);
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