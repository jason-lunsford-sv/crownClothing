import { useDispatch, useSelector } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import './product-card.styles.scss';

const ProductCard = ({
    data
}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const { name, price, imageUrl } = data;

    const handleClick = () => {
        dispatch(addItemToCart(cartItems, data));
    };

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={handleClick}
            >
                Add to card
            </Button>
        </div>
    );
};

export default ProductCard;