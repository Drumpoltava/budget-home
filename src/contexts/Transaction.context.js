import React, { createContext, useEffect, useReducer } from 'react';

import TRANSACTION_DATA from '../data/Transaction.data';

export const TransactionContext = createContext({
  transactions: [],
  addTransaction: () => { },
  incomeCounter: 0,
  outcomeCounter: 0,
  incomeTotal: 0,
  outcomeTotal: 0
});

export const TRANSACTIONS_ACTION_TYPES = {
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  SET_TRANSACTIONS_INCOME_COUNTER: 'SET_TRANSACTIONS_INCOME_COUNTER',
  SET_TRANSACTIONS_INCOME_TOTAL: 'SET_TRANSACTIONS_INCOME_TOTAL',
  SET_TRANSACTIONS_OUTCOME_COUNTER: ' SET_TRANSACTIONS_OUTCOME_COUNTER',
  SET_TRANSACTIONS_OUTCOME_TOTAL: 'SET_TRANSACTIONS_OUTCOME_TOTAL',
};

const INITIAL_TRANSACTIONS = {
  transactions: TRANSACTION_DATA,
  incomeCounter: 0,
  outcomeCounter: 0,
  incomeTotal: 0,
  outcomeTotal: 0
};

const transactionReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload
      }
    case TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS_INCOME_COUNTER:
      return {
        ...state,
        incomeCounter: payload
      }
    case TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS_INCOME_TOTAL:
      return {
        ...state,
        incomeTotal: payload
      }
    case TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS_OUTCOME_COUNTER:
      return {
        ...state,
        outcomeCounter: payload
      }
    case TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS_OUTCOME_TOTAL:
      return {
        ...state,
        outcomeTotal: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in transactionReducer`)
  };
};

export const TransactionProvider = ({ children }) => {
  const [
    {
      transactions,
      incomeCounter,
      outcomeCounter,
      incomeTotal,
      outcomeTotal
    }, dispatch] = useReducer(transactionReducer, INITIAL_TRANSACTIONS);

  useEffect(() => {

    const newIncomeCounter = transactions.reduce((acc, transaction) => {
      return acc + (transaction.amount > 0 ? 1 : 0);
    }, 0);
    const newOutcomeCounter = transactions.reduce((acc, transaction) => {
      return acc + (transaction.amount < 0 ? 1 : 0);
    }, 0);
    const newIncomeTotal = transactions.reduce((acc, transaction) => {
      return acc + (transaction.amount > 0 ? transaction.amount : 0);
    }, 0);
    const newOutcomeTotal = transactions.reduce((acc, transaction) => {
      return acc + (transaction.amount < 0 ? transaction.amount : 0);
    }, 0);

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS_INCOME_COUNTER,
      payload: newIncomeCounter
    });

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS_INCOME_TOTAL,
      payload: newIncomeTotal
    });

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS_OUTCOME_COUNTER,
      payload: newOutcomeCounter
    });

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS_OUTCOME_TOTAL,
      payload: newOutcomeTotal
    });

  }, [transactions]);

  const addTransaction = (newTransactionName, newTransactionAmount, newTransactionCategoryId) => {
    if (newTransactionName.trim().length === 0) {
      return;
    };

    newTransactionAmount = parseFloat(newTransactionAmount);

    if (newTransactionAmount === 0) {
      return;
    };
    
    const newTransaction = addTransactionToTheState(transactions, newTransactionName, newTransactionAmount, newTransactionCategoryId);

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.SET_TRANSACTIONS,
      payload: newTransaction
    })
  };

  const value = {
    transactions,
    addTransaction,
    incomeCounter,
    outcomeCounter,
    incomeTotal,
    outcomeTotal
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
};

const addTransactionToTheState = (transactions, newTransactionName, newTransactionAmount, newTransactionCategoryId) => {
  const maxId = transactions.reduce((acc, transaction) => {
    return transaction.id > acc ? transaction.id : acc;
  }, 0);

  const newTransactionData = {
    id: maxId + 1,
    name: newTransactionName,
    amount: newTransactionAmount,
    categoryId: newTransactionCategoryId,
    createDate: new Date(),
  };

  return [...transactions, newTransactionData];
};


// import React, { createContext, useEffect, useState } from 'react';

// export const TransactionContext = createContext({
//   transactions: [],
//   setTransactions: () => { },
//   addTransaction: () => { },
//   incomeCounter: 0,
//   outcomeCounter: 0,
//   incomeTotal: 0,
//   outcomeTotal: 0
// });

// export const TransactionProvider = ({ children }) => {
//   const [transactions, setTransactions] = useState([
//     {
//       id: 1,
//       name: "Complete store project",
//       amount: 200,
//       categoryId: 1,
//       createDate: new Date(),
//     },

//     {
//       id: 2,
//       name: "Received from John",
//       amount: 50,
//       categoryId: 2,
//       createDate: new Date(),
//     },

//     {
//       id: 3,
//       name: "Pizza",
//       amount: -15,
//       categoryId: 3,
//       createDate: new Date(),
//     },
//   ]);

//   const [incomeCounter, setIncomeCounter] = useState(transactions.reduce((acc, transaction) => {
//     return acc + (transaction.amount > 0 ? 1 : 0);
//   }, 0));
//   const [outcomeCounter, setOutcomeCounter] = useState(transactions.reduce((acc, transaction) => {
//     return acc + (transaction.amount < 0 ? 1 : 0);
//   }, 0));
//   const [incomeTotal, setIncomeTotal] = useState(transactions.reduce((acc, transaction) => {
//     return acc + (transaction.amount > 0 ? transaction.amount : 0);
//   }, 0));
//   const [outcomeTotal, setOutcomeTotal] = useState(transactions.reduce((acc, transaction) => {
//     return acc + (transaction.amount < 0 ? transaction.amount : 0);
//   }, 0));

//   useEffect(() => {
//     setIncomeCounter(oldIncomeCounter => {
//       console.log(transactions);
//       return transactions.reduce((acc, transaction) => {
//         return acc + (transaction.amount > 0 ? 1 : 0);
//       }, 0);
//     });

//     setOutcomeCounter(oldOutcomeCounter => {
//       return transactions.reduce((acc, transaction) => {
//         return acc + (transaction.amount < 0 ? 1 : 0);
//       }, 0);
//     });

//     setIncomeTotal(oldIncomeTotal => {
//       return transactions.reduce((acc, transaction) => {
//         return acc + (transaction.amount > 0 ? transaction.amount : 0);
//       }, 0);
//     });

//     setOutcomeTotal(oldOutcomeTotal => {
//       return transactions.reduce((acc, transaction) => {
//         return acc + (transaction.amount < 0 ? transaction.amount : 0);
//       }, 0);
//     });
//   }, [transactions])

//   const addTransaction = (newTransactionName, newTransactionAmount, newTransactionCategoryId) => {
//     setTransactions(addTransactionToTheState(transactions, newTransactionName, newTransactionAmount, newTransactionCategoryId));
//   }

//   const value = { transactions, setTransactions, addTransaction, incomeCounter, outcomeCounter, incomeTotal, outcomeTotal };

//   return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
// }

// const addTransactionToTheState = (transactions, newTransactionName, newTransactionAmount, newTransactionCategoryId) => {
//   const maxId = transactions.reduce((acc, transaction) => {
//     return transaction.id > acc ? transaction.id : acc;
//   }, 0);

//   const newTransactionData = {
//     id: maxId + 1,
//     name: newTransactionName,
//     amount: newTransactionAmount,
//     categoryId: newTransactionCategoryId,
//     createDate: new Date(),
//   };

//   return [...transactions, newTransactionData];
// };