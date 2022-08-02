import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import {
    CategoryPreviewContainer,
    CategoryTitleLink,
    Preview
} from './category-preview.styles';

const CategoryPreview = ({
    title,
    products
}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryTitleLink to={title}>{title.toUpperCase()}</CategoryTitleLink>
            </h2>
            <Preview>
                {
                    products.filter((_, index) => index < 4)
                    .map(product => <ProductCard key={product.id} data={product} />)
                }
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;