import "./App.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { useSelector } from 'react-redux';

function App() {
  const authentication = useSelector(state=> state.authentication)

  return (
    <>{authentication ? <Home className="body home-grid" /> : <SignIn />}</>
  );
}

export default App;
