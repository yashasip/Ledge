import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useState,useEffect } from "react";

import BudgetGraph from "./BudgetGraph";

import "./Outlook.css";

import moneyLogo from "./wallet-logo.png";
import AccountContext from "../context/Account/AccountContext";
import BudgetContext from "../context/Budget/BudgetContext";

function Outlook() {
  return (
    <div className="outlook-grid">
      <Card className="outlook-inner-grid outlook-card">
        <Card.Body>
          <Card.Title className="outlook-title-grid">Outlook</Card.Title>
          <hr />
          <div className="outlook-tiles-grid">
            <BalanceCard />
            <Budget />
            {/* <Card>
              <Card.Body>
                <Card.Title>Track</Card.Title>
                <Card.Img></Card.Img>
              </Card.Body>
            </Card> */}
          </div>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}

export default Outlook;

export function BalanceCard() {
  const [totalBalance, setTotalBalance] = useState(0);
  const accountContext = useContext(AccountContext)
  useEffect(() => {
    setTotalBalance(accountContext.accounts.reduce(function (acc, curr) {
      acc = acc + curr.balance;
      return acc;
    }, 0))
  }, [accountContext.accounts]);
  

  return (
    <div>
      <Card>
        <Card.Body className="total-balance-body-grid total-balance-body">
          <Card.Title>Total Balance</Card.Title>
          <Card.Subtitle className="total-balance">
            ₹ {totalBalance}
          </Card.Subtitle>
          <Card.Img src={moneyLogo} className="money-logo" />
        </Card.Body>
      </Card>
    </div>
  );
}

export function Budget() {
  const budgetContext = useContext(BudgetContext)

  return (
    <div>
      <Card>
        <Card.Body className="budget-body-grid budget-body">
          <div className="budget-header">
            <Card.Title>Budget</Card.Title>
            <Card.Subtitle className="budget-name">
              <div className = 'indicator' ></div>
               {' ' +budgetContext.budget.budgetName}
            </Card.Subtitle>
          </div>
          <div className="budget-graph-grid">
            <BudgetGraph spent={budgetContext.budget.budgetSpent ? budgetContext.budget.budgetSpent : 0} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
