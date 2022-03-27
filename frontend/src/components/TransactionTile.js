import React from "react";
import { Card } from "react-bootstrap";


import "./TransactionTile.css";

function TransactionTile(props) {

  return (
    <div>
      <Card className="transaction-tile">
        <Card.Body className="transaction-tile-grid">
          <Card.Title>{props.transaction.category_name}</Card.Title>
          <Card.Text className="transaction-cash">
            Date: {props.transaction.transaction_date.slice(0, 10)}
          </Card.Text>
          <Card.Subtitle>
            {props.transaction.account_name} • {props.transaction.type}
          </Card.Subtitle>
          <Card.Text className="transaction-cash">
            {props.transaction.currency_symbol}
            {props.transaction.amount}
          </Card.Text>
          <Card.Text>{props.transaction.transaction_party}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TransactionTile;
