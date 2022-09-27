import { CATEGORIES_ACTION_TYPES } from './category.types'

export const deleteCategory = (categoriesList, categoryID) => {

    const newCategoriesList = categoriesList.filter((category) => {
        return category.id !== categoryID
    });

    return {
        type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LIST,
        payload: newCategoriesList
    }
}

export const addCategory = (categoriesList, newCategorName) => {
    const maxId = categoriesList.reduce((acc, category) => {
        return category.id > acc ? category.id : acc;
    }, 0);

    const newCategory = {
        id: maxId + 1,
        name: newCategorName
    }

    return {
        type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_LIST,
        payload: [...categoriesList, newCategory]
    }
}