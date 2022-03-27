import { useState } from "react";
import LoginContext from "./LoginContext";

const LoginState = (props) => {
    const [username, setUsername] = useState('');

    return (
      <LoginContext.Provider value={{ username, setUsername }}>
        {props.children}
      </LoginContext.Provider>
    );
}

export default LoginState;