import { createContext, useState, useEffect } from 'react';

import {
    addCollectionAndDocuments,
    getCategoriesAndDocuments
} from '../utils/firebase/firebase.utils.js';

// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({
    children
}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // This runs ONCE to populate the database
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA, 'title');
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []);

    const value = {
        categoriesMap,
        setCategoriesMap
    };

    return (
        <CategoriesContext.Provider
            value={value}
        >
            {children}
        </CategoriesContext.Provider>
    );
};