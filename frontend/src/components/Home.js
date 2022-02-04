import Header from "./Header";
import Accounts from "./Accounts";
import Transactions from "./Transactions";
import NewTransaction from "./NewTransaction";
import Outlook from "./Outlook";
import SideBar from "./SideBar";

import "./Home.css";
import AccountState from "../context/Account/AccountState";
import CategoryState from "../context/Category/CategoryState";
import TransactionState from "../context/Transaction/TransactionState";

function Home() {
  return (
    <>
      <AccountState>
        <TransactionState>
          <CategoryState>
            <Header title="Ledge" />
            <div className="home-grid">
              <Accounts title="Accounts" />
              <Transactions title="Transactions" />
              <NewTransaction title="Add New Transaction" />
              <Outlook title="Outlook" />
              <SideBar />
            </div>
          </CategoryState>
        </TransactionState>
      </AccountState>
    </>
  );
}

export default Home;
