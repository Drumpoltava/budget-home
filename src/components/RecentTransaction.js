import React from 'react';
import { useSelector } from 'react-redux';

import { transactionListSelector } from '../store/Transaction/transaction.selector';
import { categoryListSelector } from '../store/Categories/category.selector';
import { transactionIncomeCounterSelector } from '../store/Transaction/transaction.selector';
import { transactionOutcomeCounterSelector } from '../store/Transaction/transaction.selector';
import { transactionIncomeTotalSelector } from '../store/Transaction/transaction.selector';
import { transactionOutcomeTotalSelect } from '../store/Transaction/transaction.selector';

import { Container, Row, ListGroup, Alert } from "react-bootstrap";
import { ArrowDownCircle } from "react-bootstrap-icons";
import { ArrowUpCircle } from "react-bootstrap-icons";

import { monthNames } from "../utils/date";


const RecentTransaction = () => {
  const transactions = useSelector(transactionListSelector);
  const categoriesList = useSelector(categoryListSelector);
  const incomeCounter = useSelector(transactionIncomeCounterSelector);
  const outcomeCounter = useSelector(transactionOutcomeCounterSelector);
  const incomeTotal = useSelector(transactionIncomeTotalSelector);
  const outcomeTotal = useSelector(transactionOutcomeTotalSelect);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatDate = (date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    return `${monthNames[month]} ${day}, ${year} ${hours}:${minutes}`;
  };

  const getCategoryNameById = (categoryId) => {

    let category = categoriesList.find((category) => categoryId === category.id);

    if (category) {
      return category.name;
    };

    return '';
  };


  return (
    <Container>
      <Row>
        <Alert variant="light">Recent Transactions</Alert>
      </Row>
      <Row>
        <ListGroup>
          {transactions.map((transaction) => {
            return (
              <ListGroup.Item key={`recen-transaction-item-${transaction.id}`}>
                <div
                  className={`recent-transaction-amount-dollar-format ${transaction.amount > 0 ? "green" : "red"
                    }`}
                >
                  {formatter.format(transaction.amount)}
                </div>
                <div>
                  <span className="recent-transaction-id">
                    {transaction.id}.{" "}
                  </span>
                  <span className="recent-transaction-category">
                    [{getCategoryNameById(transaction.categoryId)}];
                  </span>
                  <span>{transaction.name}</span>
                  <span className="recent-transaction-amount-text">
                    {transaction.amount > 0 && "+"}
                    {transaction.amount}
                  </span>
                </div>
                <div>
                  <span className="recent-transaction-create-date">
                    {formatDate(transaction.createDate)}
                  </span>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>
      <Row>
        <Alert variant="secondary">
          <span className="recent-transaction-amount-dollar-format-income green">
            <ArrowUpCircle /> Income: {incomeCounter} ={" "}
            <b>{formatter.format(incomeTotal)}</b>
          </span>
          <span className="recent-transaction-amount-dollar-format-outcome red">
            <ArrowDownCircle /> Outcome: {outcomeCounter} ={" "}
            <b>{formatter.format(outcomeTotal).replace("-", "")}</b>
          </span>
        </Alert>
      </Row>
    </Container>
  );
};

export default RecentTransaction;
