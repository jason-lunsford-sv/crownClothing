import { createSelector } from 'reselect';

const selectCategoryReducer = state => {
    return state.categories
};

// Memo-izing the categories store slice. If the categories object
// extracted by and returned from the selectCategoryReducer does not change,
// return the already calculated array, no need to re-run the reducers.
// Memo-ized selector one
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

// Memo-ized selector two
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce((acc, category) => {
            const { title, items } = category;
    
            acc[title.toLowerCase()] = items;
    
            return acc;
        }, {});
    }
);