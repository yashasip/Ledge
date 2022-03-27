import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

import NewTransactionForm from "./NewTransactionForm";

import "./NewTransaction.css";

function NewTransaction() {
  
  const [newTransaction, openTransactionForm] = useState(false);
  return (
    <div>
      <Button
        variant="success"
        className="new-transaction"
        name="Add Transaction"
        onClick={() => openTransactionForm(true)}
      >
        + New Transaction 
      </Button>
      <NewTransactionForm
        newTransactionTrigger={newTransaction}
        openTransactionFormTrigger={openTransactionForm}
      />
    </div>
  );
}

export default NewTransaction;
