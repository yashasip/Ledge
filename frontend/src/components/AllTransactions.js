import React from "react";
import {useContext} from "react";
import { CloseButton } from "react-bootstrap";

import TransactionTile from "./TransactionTile";
import "./scrollable.css";
import "./Popup.css";

import TransactionContext from "../context/Transaction/TransactionContext";


function AllTransactions(props) {
  const transactionContext = useContext(TransactionContext);
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
          {transactionContext.transactions.map((transaction) => (
            <div>
              <TransactionTile transaction={transaction} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AllTransactions;
