import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { recalcIncomeCounter, recalcOutcomeCounter, recalcIncomeTotal, recalcOutcomeTotal } from './store/Transaction/transaction.action';
import { transactionListSelector } from './store/Transaction/transaction.selector';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Categories from "./components/Categories";
import Transaction from "./components/Transaction";

const App = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(transactionListSelector);

  useEffect(() => {
    dispatch(recalcIncomeCounter(transactions));
    dispatch(recalcOutcomeCounter(transactions));
    dispatch(recalcIncomeTotal(transactions));
    dispatch(recalcOutcomeTotal(transactions));

  }, [transactions]);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Categories />
        </Col>
        <Col sm={8}>
          <Transaction />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
