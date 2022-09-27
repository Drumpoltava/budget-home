import { TRANSACTION_ACTION_TYPES } from './transaction.types';

export const addTransactionToStore = (currentTransactions, newTransactionName, newTransactionAmount, newTransactionCategoryId) => {
    const maxId = currentTransactions.reduce((acc, transaction) => {
        return transaction.id > acc ? transaction.id : acc;
    }, 0);

    const newTransactionData = {
        id: maxId + 1,
        name: newTransactionName,
        amount: newTransactionAmount,
        categoryId: newTransactionCategoryId,
        createDate: new Date(),
    };

    return {
        type: TRANSACTION_ACTION_TYPES.SET_LIST,
        payload: [...currentTransactions, newTransactionData]
    };
};

export const recalcIncomeCounter = (currentTransactions) => {
    const newIncomeCounter = currentTransactions.reduce((acc, transaction) => {
        return acc + (transaction.amount > 0 ? 1 : 0);
      }, 0);

      return {
        type: TRANSACTION_ACTION_TYPES.SET_TRANSACTION_INCOME_COUNTER,
        payload: newIncomeCounter
      };
};

export const recalcOutcomeCounter = (currentTransactions) => {
    const newOutcomeCounter = currentTransactions.reduce((acc, transaction) => {
        return acc + (transaction.amount < 0 ? 1 : 0);
      }, 0);

      return {
        type: TRANSACTION_ACTION_TYPES.SET_TRANSACTION_OUTCOME_COUNTER,
        payload: newOutcomeCounter
      };
};

export const recalcIncomeTotal = (currentTransactions) => {
    const newIncomeTotal = currentTransactions.reduce((acc, transaction) => {
        return acc + (transaction.amount > 0 ? transaction.amount : 0);
      }, 0);

      return {
        type: TRANSACTION_ACTION_TYPES.SET_TRANSACTION_INCOME_TOTAL,
        payload: newIncomeTotal
      };
};

export const recalcOutcomeTotal = (currentTransactions) => {
    const newOutcomeTotal = currentTransactions.reduce((acc, transaction) => {
        return acc + (transaction.amount < 0 ? transaction.amount : 0);
      }, 0);

      return {
        type: TRANSACTION_ACTION_TYPES.SET_TRANSACTION_OUTCOME_TOTAL,
        payload: newOutcomeTotal
      };
};







