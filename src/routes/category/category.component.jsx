import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { selectCategoriesMap, selectIsCategoriesIsLoading } from '../../store/categories/categories.selector';

import {
    CategoryContainer,
    CategoryTitle
} from './category.styles';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesIsLoading);
    const [ products, setProducts ] = useState(categoriesMap[category]);
    
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading ? <Spinner /> :
                <CategoryContainer>
                    {
                        products && products.map(product => <ProductCard key={product.id} data={product} />)
                    }
                </CategoryContainer>
            }
        </Fragment>
    );
};

export default Category;