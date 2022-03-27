import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [authenticated, setAuthenticated] = useState(null);
  
  const isAuthenticated = () => {
    if (localStorage.getItem('LedgeSessionToken') != null) {
      setAuthenticated(true);
      return true;
    }
    else {
      setAuthenticated(false);
      return false;
    }
  }
  const login = (token) => {
    localStorage.setItem("LedgeSessionToken", token);
    setAuthenticated(true);
  }

  const logout = () => {
    localStorage.removeItem("LedgeSessionToken");
    setAuthenticated(false);
  }

    return (
      <AuthContext.Provider value={{ authenticated, isAuthenticated, login, logout }}>
        {props.children}
      </AuthContext.Provider>
    );
}

export default AuthState;