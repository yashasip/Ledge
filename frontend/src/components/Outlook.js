import React from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";

import BudgetGraph from "./BudgetGraph";
import TrackGraph from "./TrackGraph";

import "./Outlook.css";

import moneyLogo from "./wallet-logo.png";

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
            <Card>
              <Card.Body>
                <Card.Title>Track</Card.Title>
                <Card.Img></Card.Img>
              </Card.Body>
            </Card>
          </div>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}

export default Outlook;

export function BalanceCard() {
  const [Balance, setBalance] = useState({
    currency: "₹",
    totalBalance: "9,000",
  });

  return (
    <div>
      <Card>
        <Card.Body className="total-balance-body-grid total-balance-body">
          <Card.Title>Total Balance</Card.Title>
          <Card.Subtitle className="total-balance">
            {Balance.currency}
            {Balance.totalBalance}
          </Card.Subtitle>
          <Card.Img src={moneyLogo} className="money-logo" />
        </Card.Body>
      </Card>
    </div>
  );
}

export function Budget() {
  const [Budget, setBalance] = useState({
    budgetName: "Weekly",
    budget: "900",
  });
  return (
    <div>
      <Card>
        <Card.Body className="budget-body-grid budget-body">
          <div className="budget-header">
            <Card.Title>Budget</Card.Title>
            <Card.Subtitle className="budget-name">
              <div className = 'indicator' ></div>
               {' ' +Budget.budgetName}
            </Card.Subtitle>
          </div>
          <div className="budget-graph-grid">
            <BudgetGraph />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
