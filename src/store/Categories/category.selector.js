import { createSelector } from 'reselect';

const categoriesSelector = store => store.categories;

export const categoryListSelector = createSelector(
    [categoriesSelector],
    categories => categories.categoriesList
);



