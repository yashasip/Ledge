import { useState } from "react";
import CurrencyContext from "./CurrencyContext";

const CurrencyState = (props) => {
  const [currency, setCurrencies] = useState();

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencies }}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyState;
