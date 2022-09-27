import { TRANSACTION_ACTION_TYPES } from './transaction.types';

export const INITIAL_TRANSACTION_STATE = {
    list: [],
    incomeCounter: 0,
    outcomeCounter: 0,
    incomeTotal: 0,
    outcomeTotal: 0
};

export const transactionReducer = (state = INITIAL_TRANSACTION_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case TRANSACTION_ACTION_TYPES.SET_LIST:
            return {
                ...state,
                list: payload
            }
        case TRANSACTION_ACTION_TYPES.SET_TRANSACTION_INCOME_COUNTER:
            return {
                ...state,
                incomeCounter: payload
            }
        case TRANSACTION_ACTION_TYPES.SET_TRANSACTION_OUTCOME_COUNTER:
            return {
                ...state,
                outcomeCounter: payload
            }
        case TRANSACTION_ACTION_TYPES.SET_TRANSACTION_INCOME_TOTAL:
            return {
                ...state,
                incomeTotal: payload
            }
        case TRANSACTION_ACTION_TYPES.SET_TRANSACTION_OUTCOME_TOTAL:
            return {
                ...state,
                outcomeTotal: payload
            }
        default:
            return state;
    };
};