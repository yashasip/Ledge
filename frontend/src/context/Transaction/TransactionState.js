import { useState } from "react";
import TransactionContext from "./TransactionContext";

const TransactionState = (props) => {
  const [transactions, setTransactions] = useState([
  ]);

  const getTransactions = async () => {
    console.log("start");
    const response = await fetch(
      "http://127.0.0.1:8000/api/Transaction/user_transactions",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + localStorage.getItem("LedgeSessionToken"),
        },
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      console.log(json);
      console.log(json.transactions);
      setTransactions(json.transactions);
      console.log("success");
    } else {
      console.log("failure");
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, getTransactions }}>
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
