import React from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";

import "./TransactionTile.css";

function TransactionTile() {
  const [transaction, setTransaction] = useState({
    category: "Food & Drinks",
    amount: "200",
    to: "Me",
    from: "aa",
    date: "Today",
    time: "",
    account: "Wallet",
    type: "Income",
    currency: "₹",
  });

  return (
    <div>
      <Card className= "transaction-tile">
        <Card.Body className="transaction-tile-grid">
          <Card.Title>{transaction.category}</Card.Title>
          <Card.Text className= 'transaction-cash'>{transaction.date}</Card.Text>
          <Card.Subtitle>
            {transaction.account} • {transaction.type}
          </Card.Subtitle>
          <Card.Text className= 'transaction-cash'>
            {transaction.currency}
            {transaction.amount}
          </Card.Text>
          <Card.Text>{transaction.to}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TransactionTile;
