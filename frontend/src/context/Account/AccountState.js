import { useState } from "react";
import AccountContext from "./AccountContext";

const AccountState = (props) => {
  const [accounts, setAccounts] = useState([
    // {
    //   account_name: "acc",
    //   account_type: "",
    //   balance: 100,
    //   currency_symbol: "$",
    //   currency_code: "USD",
    // },
  ]);

  const getAccounts = async () => {
    console.log('start');
    const response = await fetch(
      "http://127.0.0.1:8000/api/Account/user_account_list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("LedgeSessionToken"),
        },
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      console.log(json);
        console.log(json.accounts);
        setAccounts(json.accounts)
      console.log("success");
    } else {
      console.log("failure");
    }
  };

  return (
    <AccountContext.Provider value={{ accounts, getAccounts }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
