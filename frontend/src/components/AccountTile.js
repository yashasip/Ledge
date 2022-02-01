import React from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";

import "./AccountTile.css";

function Tile() {
  const [account, setAccount] = useState({
    Name: "Account",
    Balance: "1,000",
    Type: "Personal",
    Currency: "₹",
  });

  return (
    <div>
      <Card className="account-tile">
        <Card.Body className="account-tile-grid">
          <div>
            <Card.Title>
              {account.Name} <label></label>
            </Card.Title>
            <Card.Subtitle>{account.Type} </Card.Subtitle>
          </div>
          <Card.Text className="account-cash">
            {account.Currency}
            {account.Balance}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Tile;
