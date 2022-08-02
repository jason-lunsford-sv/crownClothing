import {
    CartItemContainer,
    ItemImg,
    ItemDetails,
    Copy
} from './cart-item.styles';

const CartItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;

    return (
        <CartItemContainer>
            <ItemImg src={imageUrl} alt={name} />
            <ItemDetails>
                <Copy>{name}</Copy>
                <Copy>
                    {quantity} x ${price}
                </Copy>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;