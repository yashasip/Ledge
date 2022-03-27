import { useState } from "react";
import CurrencyContext from "./CurrencyContext";

const CurrencyState = (props) => {
  const [currency, setCurrencies] = useState([]);

      const getCurrencies = async () => {
        console.log("start");
        const response = await fetch(
          "http://127.0.0.1:8000/api/currency/get_currencies",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization":
                "Token " + localStorage.getItem("LedgeSessionToken"),
            },
          }
        );
        const json = await response.json();
        if (json.status === "success") {
          console.log(json);
          console.log(json.currencies);
          setCurrencies(json.currencies);
          console.log("currency success");
        } else {
          console.log("failure");
        }
      };

  return (
    <CurrencyContext.Provider value={{ currency, getCurrencies }}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyState;
