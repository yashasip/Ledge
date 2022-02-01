import React from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import "./Popup.css";

function NewBudget(props) {
  return props.newBudgetTrigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
          <h3>Create Budget</h3>
        </div>
        <hr className="sidebar-line" />
        <CloseButton
          className="close-popup"
          onClick={() => props.newBudgetFormTrigger(false)}
        />
        <Form className="new-budget-grid">
          <Form.Group className="mb-3 new-budget-name">
            <Form.Label>Budget Name</Form.Label>
            <Form.Control type="Text" placeholder="New Budget Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Choose Account</Form.Label>
            <Form.Select>
              <option value="1">Account 1</option>
              <option value="2">Account 2</option>
              <option value="3">Account 3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Budget Label</Form.Label>
            <Form.Control type="Text" placeholder="Enter Budget Label" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>To</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Budget Amount</Form.Label>
            <Form.Control type="number" placeholder="Budget Amount Limit" />
          </Form.Group>
        </Form>
        <div className="create-button-flex">
          <Button variant="outline-primary" className="create-button">
            Create Budget
          </Button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default NewBudget;
