import React, { useContext } from "react";

import "./Header.css";
import { BiUser } from "react-icons/bi";
import LoginContext from "../context/Login/LoginContext";

export default function Header() {
  const loginContext = useContext(LoginContext);

  return (
    <nav className="navbar">
      <div className="nav-brand">Ledge</div>
      <div className="nav-user">
        {loginContext.username}
        <BiUser className='user-image'/>
      </div>
    </nav>
  );
}
