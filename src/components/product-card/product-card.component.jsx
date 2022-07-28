import Button from '../button/button.component';

import './product-card.styles.scss';

const ProductCard = ({
    data
}) => {
    const { name, price, imageUrl } = data;

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted">Add to card</Button>
        </div>
    );
};

export default ProductCard;