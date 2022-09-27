import { combineReducers } from 'redux';

import { categoriesReducer } from './Categories/category.reducer';
import { transactionReducer } from './Transaction/transaction.reducer';

export const rootReducer = combineReducers({
    categories: categoriesReducer,
    transactions: transactionReducer
});