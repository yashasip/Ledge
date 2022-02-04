import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState, useContext } from "react";

import NewAccountForm from "./NewAccountForm";
import AccountTile from "./AccountTile";

import "./scrollable.css";
import "./Accounts.css";

import AccountContext from "../context/Account/AccountContext";

export default function Accounts() {
  const [newAccount, openForm] = useState(false);
  const accountContext = useContext(AccountContext);
  return (
    <Card className="accounts-card accounts-grid">
      <Card.Body>
        <Card.Title className="accounts-title-grid">
          Accounts{" "}
          <Button
            variant="outline-dark"
            name="Add Account"
            onClick={() => openForm(true)}
            >
            +
          </Button>
          <NewAccountForm
            newAccountTrigger={newAccount}
            openFormTrigger={openForm}
            />
        </Card.Title>
        <hr />
        <div className="accounts-tiles-grid accounts-scrollable">
          {accountContext.accounts.map((account) => (
            <div><AccountTile account={account} /></div>
            ))}
        </div>
      </Card.Body>
    </Card>
  );
}
