import { CATEGORIES_ACTION_TYPES } from './category.types';

import CATEGORIES_DATA from '../../data/Categories.data';


export const INITIAL_CATEGORIES_LIST = {
    categoriesList: CATEGORIES_DATA,
};

export const categoriesReducer = (state = INITIAL_CATEGORIES_LIST, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LIST:
            return {
                ...state,
                categoriesList: payload
            }
        default:
            return state;
    };
};