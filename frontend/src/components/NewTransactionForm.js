import React from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import "./Popup.css";

function NewTransactionForm(props) {
  return props.newTransactionTrigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
          <h3>New Transaction</h3>
        </div>
        <hr className="new-transaction-line" />
        <CloseButton
          className="close-popup"
          onClick={() => props.openTransactionFormTrigger(false)}
        />
        <Form className="new-transaction-form-grid">
          <Form.Group className="mb-3">
            <Form.Label>Choose Account</Form.Label>
            <Form.Select>
              <option value="1">Account 1</option>
              <option value="2">Account 2</option>
              <option value="3">Account 3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Select>
              <option value="1">Income</option>
              <option value="2">Expense</option>
              <option value="3">Transfer</option>
            </Form.Select>
          </Form.Group>
          <div className="amount-details">
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Select>
                <option value="1">INR ₹</option>
                <option value="2">American Dollar $</option>
                <option value="3">Euro €</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter Amount" />
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </Form.Select>
          </Form.Group>
          <div className="date-time">
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>To/From</Form.Label>
            <Form.Control type="text" placeholder="Payee Name" />
          </Form.Group>
          <div className="description-box">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Transaction Details"
              />
            </Form.Group>
          </div>
        </Form>
        <div className="create-transaction-button-grid">
          <Button variant="outline-success">Create Transaction</Button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default NewTransactionForm;
