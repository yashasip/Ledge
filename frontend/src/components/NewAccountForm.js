import React from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import "./Popup.css";

function NewAccountForm(props) {
  return props.newAccountTrigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
          <h3>Create New Account</h3>
        </div>
        <hr className="new-account-line" />
        <CloseButton
          className="close-popup"
          onClick={() => props.openFormTrigger(false)}
        />
        <Form className="create-account-form-grid">
          <Form.Group className="mb-3">
            <Form.Label>Account Name</Form.Label>
            <Form.Control type="Text" placeholder="New Account Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Account Type</Form.Label>
            <Form.Control type="Text" placeholder="Account Type" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Currency</Form.Label>
            <Form.Select>
              <option value="1">INR ₹</option>
              <option value="2">American Dollar $</option>
              <option value="3">Euro €</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Balance</Form.Label>
            <Form.Control type="number" placeholder="Starting Balance" />
          </Form.Group>
          <div className="create-button-flex">
            <Button variant="outline-danger" className="create-button">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  ) : (
    // console.log('hey');
      ''
  );
}

export default NewAccountForm;
