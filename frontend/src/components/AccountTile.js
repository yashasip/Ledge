import React from "react";
import { Card } from "react-bootstrap";


import "./AccountTile.css";

function Tile(props) {
  return (
    <div>
      <Card className="account-tile">
        <Card.Body className="account-tile-grid">
          <div>
            <Card.Title>
              <label>{props.account.account_name} </label>
            </Card.Title>
            <Card.Subtitle>{props.account.account_type} </Card.Subtitle>
          </div>
          <Card.Text className="account-cash">
            {props.account.currency_symbol}
            {props.account.balance}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Tile;
