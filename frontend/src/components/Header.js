import React, { useState } from "react";

import "./Header.css";
import { BiUser } from "react-icons/bi";

export default function Header() {
  const [user, setUser] = useState({ userName: "Alex", userPhoto: null });

  return (
    <nav className="navbar">
      <div className="nav-brand">Ledge</div>
      <div className="nav-user">
        {user.userName}
        <BiUser className='user-image'/>
      </div>
    </nav>
  );
}
