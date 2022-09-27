import React, { useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addTransactionToStore } from '../store/Transaction/transaction.action';
import { categoryListSelector } from '../store/Categories/category.selector';
import { transactionListSelector } from '../store/Transaction/transaction.selector';

import { Row, Col, Form, Button } from "react-bootstrap";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const categoriesList = useSelector(categoryListSelector);
  const transactionList = useSelector(transactionListSelector);
  const newTransactionNameRef = useRef();
  const newTransactionAmountRef = useRef();
  const newTransactionCategoryRef = useRef();

  const handleAddTransaction = () => {
    const newTransactionName = newTransactionNameRef.current.value;
    newTransactionNameRef.current.value = '';

    const newTransactionAmount = parseFloat(
      newTransactionAmountRef.current.value
    );
    newTransactionAmountRef.current.value = '';

    const newTransactionCategoryId = parseInt(newTransactionCategoryRef.current.value);

    if (newTransactionName.trim().length === 0) {
      return false;
    }

    if (isNaN(newTransactionAmount) || newTransactionAmount === 0) {
      return false;
    };

    dispatch(addTransactionToStore(transactionList, newTransactionName, newTransactionAmount, newTransactionCategoryId));
  };

  return (
    <>
      <Row className="mb-3">
        <Form.Group xs={8} as={Col}>
          <Form.Control
            ref={newTransactionNameRef}
            type="text"
            placeholder="Specify transaction name"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            ref={newTransactionAmountRef}
            type="text"
            placeholder="Amount 0,00"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group>
          <Form.Select ref={newTransactionCategoryRef}>
            {categoriesList.map((cat) => {
              return (
                <option key={`transaction-category-${cat.id}`} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4 add-transaction-button-container">
        <Button
          id="add-transaction-button"
          variant="success"
          onClick={handleAddTransaction}
        >
          Add Transaction
        </Button>
      </Row>
    </>
  );
};

export default AddTransaction;
