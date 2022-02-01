import React from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";

import TransactionTile from "./TransactionTile";
import AllTransactions from "./AllTransactions";

import "./scrollable.css";
import "./Transactions.css";
import "./Button.css";

export default function Transactions() {
  const [allTransactions, viewAllTransactions] = useState(false);

  const tiles = [TransactionTile(), TransactionTile(), TransactionTile()];
  return (
    <>
      <Card className="transactions-card transactions-grid">
        <Card.Body>
          <Card.Title className="transactions-title-grid">
            Transactions
          </Card.Title>
          <hr />
          <div className="transactions-tiles-grid scrollable">
            {tiles.map((tile) => (
              <div>{tile}</div>
            ))}
          </div>
        </Card.Body>
        <div className="all-transactions">
          <Button variant="outline-info" onClick={()=> viewAllTransactions(true)}>
            View All
          </Button>
          <AllTransactions
            allTransactionsTrigger={allTransactions}
            viewAllTransactionsTrigger={viewAllTransactions}
          />
        </div>
      </Card>
    </>
  );
}
