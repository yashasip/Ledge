import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";

import TransactionTile from "./TransactionTile";
import AllTransactions from "./AllTransactions";
import TransactionContext from "../context/Transaction/TransactionContext";

import "./scrollable.css";
import "./Transactions.css";
import "./Button.css";

export default function Transactions() {
  const [allTransactions, viewAllTransactions] = useState(false);
  const transactionContext = useContext(TransactionContext);
  return (
    <>
      <Card className="transactions-card transactions-grid">
        <Card.Body>
          <Card.Title className="transactions-title-grid">
            Transactions
          </Card.Title>
          <hr />
          <div className="transactions-tiles-grid scrollable">
            {transactionContext.transactions.map((transaction) => (
              <div>
                <TransactionTile transaction={transaction} />
              </div>
            ))}
          </div>
        </Card.Body>
        <div className="all-transactions">
          <Button
            variant="outline-info"
            onClick={() => viewAllTransactions(true)}
          >
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
