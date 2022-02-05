import React from "react";
import { useState,useContext } from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import "./Popup.css";

import AccountContext from "../context/Account/AccountContext";
import AlertContext from "../context/Alert/AlertContext";

const NewAccountForm = (props)=> {
  const accountContext = useContext(AccountContext);
  const alertContext = useContext(AlertContext);

  const [newAccount, setNewAccount] = useState({
    account_name: "",
    account_type: "",
    currency: "INR ₹",
    balance: 0,
  });
  
  const submitAccountForm = async (e) => {
    console.log(newAccount);
    e.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:8000/api/Account/new_account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("LedgeSessionToken"),
        },
        body: JSON.stringify({
          account_name: newAccount.account_name,
          account_type: newAccount.account_type,
          currency_code: newAccount.currency.split(' ')[0],
          balance: newAccount.balance,
        }),
      }
      );
      const json = await response.json();
      if (json.status === "success") {
        console.log(json);
        accountContext.getAccounts()
        console.log("success1");
        alertContext.getAlert(json.message);
      } else {
        alertContext.getAlert(json.message, "danger");
        console.log("failure");
      }
      setNewAccount({
        account_name: "",
        account_type: "",
        currency: "INR ₹",
        balance: 0,
      });
      console.log(newAccount)
      props.openFormTrigger(false);
    };
    
  const onChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

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
        <Form className="create-account-form-grid" onSubmit={submitAccountForm}>
          <Form.Group className="mb-3">
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="Text"
              name="account_name"
              onChange={onChange}
              placeholder="New Account Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Account Type</Form.Label>
            <Form.Control
              type="Text"
              name="account_type"
              onChange={onChange}
              placeholder="Account Type"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Currency</Form.Label>
            <Form.Select name="currency" onChange={onChange}>
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="number"
              name="balance"
              onChange={onChange}
              placeholder="Starting Balance"
            />
          </Form.Group>
          <div className="create-button-flex">
            <Button
              variant="outline-danger"
              className="create-button"
              onClick={submitAccountForm}
            >
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  ) : (
    // console.log('hey');
    ""
  );
}

export default NewAccountForm;
