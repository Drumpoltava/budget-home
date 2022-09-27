import React from "react";

import { Container, Row, Alert } from "react-bootstrap";

import RecentTransaction from "./RecentTransaction";
import AddTransaction from "./AddTransaction";

const Transaction = () => {

  return (
    <Container>
      <Row>
        <Alert variant="light">Transactions</Alert>
      </Row>
      <AddTransaction />
      <Row>
        <RecentTransaction />
      </Row>
    </Container>
  );
};

export default Transaction;
