import React from "react";
import { Button } from "react-bootstrap";
import "./Popup.css";

function ViewTransaction(props) {
  return props.viewTransactionTrigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Button
          className="close-popup"
          onClick={() => props.openTransactionTrigger(false)}
        >
          X
        </Button>
        All Transactions
      </div>
    </div>
  ) : (
    ""
  );
}

export default ViewTransaction;
