import React from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import "./Popup.css";

function AddCategory(props) {
  return props.addCategoryTrigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
          <h3>New Category</h3>
        </div>
        <hr className="sidebar-line" />
        <CloseButton
          className="close-popup"
          onClick={() => props.addCategoryFormTrigger(false)}
        />
        <Form className="new-category-grid">
          <Form.Group className="mb-3 new-category-name">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="Text" placeholder="New Category Name" />
          </Form.Group>
          <div className="new-category-markers">
            <Form.Group className="mb-3 new-category-type">
              <Form.Label>Category Type</Form.Label>
              <Form.Control type="Text" placeholder="Type of Category" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control type="color"/>
            </Form.Group>
          </div>
          <div className="new-category-description-box">
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Describe Category" />
            </Form.Group>
          </div>
        </Form>
        <div className="create-button-flex">
          <Button variant="outline-primary" className="create-button">
            Add Category
          </Button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddCategory;
