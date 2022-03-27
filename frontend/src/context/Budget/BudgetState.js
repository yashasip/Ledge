import { useState } from "react";
import BudgetContext from "./BudgetContext";

const BudgetState = (props) => {
  const [budget, setBudget] = useState({ budgetName: "No Budget", budgetSpent: 0, budgetAmount: 0 });

  const getBudgetData = async () => {
    console.log("start");
    const response = await fetch("http://127.0.0.1:8000/api/Budget/get_spent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage.getItem("LedgeSessionToken"),
      },
    });
    const json = await response.json();
    if (json.status === "success") {
      console.log(json)
      setBudget({ budgetName: json.budget_name, budgetSpent: json.spent, budgetAmount: json.budget_amount })
      console.log("success");
    } else {
      setBudget({ budgetName: "No Budget", budgetSpent: 0, budgetAmount: 0 });
      console.log("failure");
    }
  };

  return (
    <BudgetContext.Provider value={{ budget, getBudgetData  }}>
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetState;
