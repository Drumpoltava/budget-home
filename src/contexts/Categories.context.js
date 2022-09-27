import React, { createContext, useReducer } from 'react';

import CATEGORIES_DATA from '../data/Categories.data';

export const CategoriesContext = createContext({
    сategoriesList: [],
    addCategory: () => { },
    deleteCategory: () => { }
});

export const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES_LIST: 'SET_CATEGORIES_LIST'
};

const categoriesReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LIST:
            return {
                ...state,
                сategoriesList: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in categoriesReducer`);
    };
};

const INITIAL_CATEGORIES_LIST = {
    сategoriesList: CATEGORIES_DATA,
};


export const CategoriesProvider = ({ children }) => {

    const [{ сategoriesList }, dispatch] = useReducer(categoriesReducer, INITIAL_CATEGORIES_LIST);

    const addCategory = (newCategoryName) => {
        if (newCategoryName.length === 0) {
            return;
        };

        const newCategorieList = addCategoryToTheState(сategoriesList, newCategoryName);

        dispatch({
            type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LIST,
            payload: newCategorieList
        });
    };

    const deleteCategory = (categoryId) => {
        const deleteCategoryId = deleteCategoryFromTheState(сategoriesList, categoryId);

        dispatch({
            type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LIST,
            payload: deleteCategoryId
        });
    };

    const value = { сategoriesList, addCategory, deleteCategory };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};

const addCategoryToTheState = (сategoriesList, newCategoryName) => {
    const maxId = сategoriesList.reduce((acc, сategory) => {

        return сategory.id > acc ? сategory.id : acc;
    }, 0);

    const newCategory = {
        id: maxId + 1,
        name: newCategoryName
    };

    return [...сategoriesList, newCategory];
};

const deleteCategoryFromTheState = (сategoriesList, categoryId) => {
    return сategoriesList.filter(сategory => сategory.id !== categoryId);
}






// import React, { createContext, useState } from 'react';

// export const CategoriesContext = createContext({
//     сategoriesList: [],
//     setСategoriesList: () => { },
//     addCategory: () => { },
//     deleteCategory: () => { }
// });

// export const CategoriesProvider = ({ children }) => {
//     const [сategoriesList, setСategoriesList] = useState([
//         {
//             id: 1,
//             name: "Salary",
//         },

//         {
//             id: 2,
//             name: "Food",
//         },

//         {
//             id: 3,
//             name: "Going out",
//         }
//     ]);

//     const addCategory = (newCategoryName) => {
//         setСategoriesList(addCategoryToTheState(сategoriesList, newCategoryName));
//     };

//     const deleteCategory = (categoryId) => {
//         setСategoriesList(deleteCategoryFromTheState(сategoriesList, categoryId));
//     };

//     const value = { сategoriesList, setСategoriesList, addCategory, deleteCategory };

//     return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
// }

// const addCategoryToTheState = (сategoriesList, newCategoryName) => {
//     const maxId = сategoriesList.reduce((acc, сategory) => {

//         return сategory.id > acc ? сategory.id : acc;
//     }, 0)

//     const newCategory = {
//         id: maxId + 1,
//         name: newCategoryName
//     }

//     return [...сategoriesList, newCategory];
// }

// const deleteCategoryFromTheState = (сategoriesList, categoryId) => {
//     return сategoriesList.filter(сategory => сategory.id !== categoryId);
// }