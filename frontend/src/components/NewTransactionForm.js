import React, { useContext, useState } from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import "./Popup.css";

import AccountContext from "../context/Account/AccountContext";
import CategoryContext from "../context/Category/CategoryContext";
import TransactionContext from "../context/Transaction/TransactionContext";

function NewTransactionForm(props) {
  const accountContext = useContext(AccountContext);
  const categoryContext = useContext(CategoryContext);
  const transactionContext = useContext(TransactionContext);

  const [transactionData, setTransactionData] = useState({
    account_name: "",
    type: "Income",
    currency_code: "INR",
    amount: 0,
    category_name: "",
    transaction_date: new Date().toISOString().slice(0, 10),
    transaction_time: new Date().toLocaleTimeString("en-GB"),
    transaction_party: "",
    description: "",
  });

  const submitTransactionForm = async (e) => {
    console.log(transactionData);
    e.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:8000/api/Transaction/new_transaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("LedgeSessionToken"),
        },
        body: JSON.stringify({
          account_name: transactionData.account_name,
          type: transactionData.type,
          currency_code: transactionData.currency_code,
          amount: transactionData.amount,
          category_name: transactionData.category_name,
          transaction_date: transactionData.transaction_date + ' ' +transactionData.transaction_time,
          transaction_party: transactionData.transaction_party,
          description: transactionData.description,
        }),
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      // reload
      console.log(json);
      transactionContext.getTransactions();
      accountContext.getAccounts();
      console.log("success");
      props.openTransactionFormTrigger(false);
    } else {
      console.log("failure");
    }
  };

  const onChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

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
            <Form.Select name="account_name" onChange={onChange}>
              <option value="" selected disabled hidden>
                Choose Account
              </option>
              {accountContext.accounts.map((account) => (
                <option value={account.account_name}>
                  {account.account_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Select name="type" onChange={onChange}>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Form.Select>
          </Form.Group>
          <div className="amount-details">
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Select name="currency_code" onChange={onChange}>
                <option value="INR">INR ₹</option>
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                name="amount"
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category_name" onChange={onChange}>
              <option value="" selected disabled hidden>
                Choose Category
              </option>
              {categoryContext.categories.map((category) => (
                <option value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="date-time">
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="transaction_date"
                onChange={onChange}
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="transaction_time"
                onChange={onChange}
                defaultValue={new Date().toLocaleTimeString("en-GB")}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Transaction Party</Form.Label>
            <Form.Control
              type="text"
              placeholder="Payee Name"
              name="transaction_party"
              onChange={onChange}
            />
          </Form.Group>
          <div className="description-box">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Transaction Details"
                name="description"
                onChange={onChange}
              />
            </Form.Group>
          </div>
        </Form>
        <div className="create-transaction-button-grid">
          <Button variant="outline-success" onClick={submitTransactionForm}>
            Create Transaction
          </Button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default NewTransactionForm;
