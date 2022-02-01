import React from "react";
import { CloseButton } from "react-bootstrap";

import TransactionTile from "./TransactionTile";
import "./scrollable.css";
import "./Popup.css";

function AllTransactions(props) {
  const tiles = [TransactionTile(), TransactionTile(), TransactionTile()];
  return props.allTransactionsTrigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
          <h3>Past Transactions</h3>
        </div>
        <hr className="sidebar-line" />
        <CloseButton
          className="close-popup"
          onClick={() => props.viewAllTransactionsTrigger(false)}
        />
        <div className="transactions-tiles-grid all-transactions-scrollable">
          {tiles.map((tile) => (
            <div>{tile}</div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AllTransactions;
