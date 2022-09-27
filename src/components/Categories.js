import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { deleteCategory, addCategory } from '../store/Categories/category.action';
import { categoryListSelector } from '../store/Categories/category.selector';

import {
  Row,
  ListGroup,
  CloseButton,
  InputGroup,
  Form,
  Button,
  Alert
} from "react-bootstrap";

import { FolderFill } from "react-bootstrap-icons";

const Categories = () => {
  const dispatch = useDispatch();

  const categoriesList = useSelector(categoryListSelector);

  const newCategoryInputRef = useRef();

  const handleNewCategory = () => {
    const enteredCategory = newCategoryInputRef.current.value;

    if (enteredCategory === '') {
      return;
    };

    newCategoryInputRef.current.value = '';

    dispatch(addCategory(categoriesList, enteredCategory));
  };

  const deleteCategoryById = (categoryId) => {

    dispatch(deleteCategory(categoriesList, categoryId));
  };

  return (
    <>
      <Row>
        <Alert variant="light">Categories</Alert>
      </Row>
      <Row>
        <ListGroup>
          {categoriesList.map((category) => {
            return (
              <ListGroup.Item key={`category-item-${category.id}`}>
                <FolderFill />
                <span className="category-name">{category.name}</span>
                <CloseButton
                  className="delete-category-button"
                  onClick={() => deleteCategoryById(category.id)}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>

      <Row>
        <InputGroup className="new-category-block">
          <Form.Control
            ref={newCategoryInputRef}
            placeholder="Enter new category"
          />
          <Button variant="success" type="button" onClick={handleNewCategory}>
            +
          </Button>
        </InputGroup>
      </Row>
    </>
  );
};

export default Categories;
