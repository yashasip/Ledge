import React from "react";
import { useContext, useState } from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import "./Popup.css";

import AccountContext from "../context/Account/AccountContext";
import BudgetContext from "../context/Budget/BudgetContext";
import AlertContext from "../context/Alert/AlertContext";

function NewBudget(props) {
  const accountContext = useContext(AccountContext);
  const budgetContext = useContext(BudgetContext);
  const alertContext = useContext(AlertContext);

  const [newBudget, setNewBudget] = useState({
    budget_name: "",
    budget_label: "",
    account_name: "",
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    budget_amount: 0,
  });

  const submitBudgetForm = async (e) => {
    console.log(newBudget);
    e.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:8000/api/Budget/new_budget",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + localStorage.getItem("LedgeSessionToken"),
        },
        body: JSON.stringify({
          budget_name: newBudget.budget_name,
          account_name: newBudget.account_name,
          budget_label: newBudget.budget_label,
          start_date: newBudget.start_date,
          end_date: newBudget.end_date,
          budget_amount: newBudget.budget_amount,
        }),
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      console.log(json);
      budgetContext.getBudgetData();
      alertContext.getAlert(json.message);
      console.log("success");
    } else {
      alertContext.getAlert(json.message, "danger");
      console.log("failure");
    }
    props.newBudgetFormTrigger(false);
    setNewBudget({
      budget_name: "",
      budget_label: "",
      account_name: "",
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      budget_amount: 0,
    });
  };

  const onChange = (e) => {
    setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
  };

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
            <Form.Control
              type="Text"
              placeholder="New Budget Name"
              name="budget_name"
              onChange={onChange}
            />
          </Form.Group>
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
            <Form.Label>Budget Label</Form.Label>
            <Form.Control
              type="Text"
              placeholder="Enter Budget Label"
              name="budget_label"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start From</Form.Label>
            <Form.Control
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              name="start_date"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End On</Form.Label>
            <Form.Control
              type="date"
              defaultValue={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10)}
              name="end_date"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Budget Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Budget Amount Limit"
              name="budget_amount"
              onChange={onChange}
            />
          </Form.Group>
        </Form>
        <div className="create-button-flex">
          <Button
            variant="outline-primary"
            className="create-button"
            onClick={submitBudgetForm}
          >
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
