import { createSelector } from 'reselect';

const transactionsSelector = store => store.transactions;

export const transactionListSelector = createSelector(
    [transactionsSelector],
    transactions => transactions.list
);

export const transactionIncomeCounterSelector = createSelector(
    [transactionsSelector],
    transactions => transactions.incomeCounter
);

export const transactionOutcomeCounterSelector = createSelector(
    [transactionsSelector],
    transactions => transactions.outcomeCounter
);

export const transactionIncomeTotalSelector = createSelector(
    [transactionsSelector],
    transactions => transactions.incomeTotal
);

export const transactionOutcomeTotalSelect = createSelector(
    [transactionsSelector],
    transactions => transactions.outcomeTotal
);



