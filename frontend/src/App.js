import "./App.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

import { useSelector } from "react-redux";
import AccountState from "./context/Account/AccountState";
import CategoryState from "./context/Category/CategoryState";
import TransactionState from "./context/Transaction/TransactionState";
import LoginState from "./context/Login/LoginState";
import BudgetState from "./context/Budget/BudgetState";
import CurrencyState from "./context/Currency/CurrencyState";
import AlertState from "./context/Alert/AlertState";

function App() {
  const authentication = useSelector((state) => state.authentication);

  return (
    <>
      <AlertState>
        <LoginState>
          <AccountState>
            <CurrencyState>
              <TransactionState>
                <CategoryState>
                  <BudgetState>
                    {authentication ? (
                      <Home className="body home-grid" />
                    ) : (
                      <SignIn />
                    )}
                  </BudgetState>
                </CategoryState>
              </TransactionState>
            </CurrencyState>
          </AccountState>
        </LoginState>
      </AlertState>
    </>
  );
}

export default App;
