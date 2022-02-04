import "./App.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

function App() {
  // const authentication = useSelector(state=> state.authentication)
  const authentication = true;

  return (
    <>
        {authentication ? <Home className="body home-grid" /> : <SignIn />}
    </>
  );
}

export default App;
