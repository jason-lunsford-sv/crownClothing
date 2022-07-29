import { useContext } from 'react';

import Button from '../button/button.component';

import { CartContext } from '../../contexts/cart.context';

import './product-card.styles.scss';

const ProductCard = ({
    data
}) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, price, imageUrl } = data;

    const handleClick = () => {
        addItemToCart(data)
    };

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button
                buttonType="inverted"
                onClick={handleClick}
            >
                Add to card
            </Button>
        </div>
    );
};

export default ProductCard;