import Header from "./Header";
import Accounts from "./Accounts";
import Transactions from "./Transactions";
import NewTransaction from "./NewTransaction";
import Outlook from "./Outlook";
import SideBar from "./SideBar";

import "./Home.css";

function Home() {
  return (
    <>

            <Header title="Ledge" />
            <div className="home-grid">
              <Accounts title="Accounts" />
              <Transactions title="Transactions" />
              <NewTransaction title="Add New Transaction" />
              <Outlook title="Outlook" />
              <SideBar />
            </div>
    </>
  );
}

export default Home;
