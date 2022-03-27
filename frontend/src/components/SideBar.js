import React, { useContext } from "react";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { bindActionCreators } from "redux";
// import { authenticationHandle } from "./state";

import { IconContext } from "react-icons/lib";
import { MdOutlineCategory } from "react-icons/md";
import { IoIosCash } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import AddCategory from "./AddCategory";
import NewBudget from "./NewBudget";
import "./SideBar.css";
import AuthContext from "../context/Auth/AuthContext";
// import { login } from "./state/actions";

function SideBar() {
  // const dispatch = useDispatch();
  // const { login } = bindActionCreators(authenticationHandle, dispatch);

  const [newCategory, addCategoryForm] = useState(false);
  const [newBudget, newBudgetForm] = useState(false);
  const authContext = useContext(AuthContext);

  return (
    <IconContext.Provider value={{ color: "#030F33", size: "3.5em" }}>
      <div className="sidebar">
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip> Add Category </Tooltip>}
        >
          <i className="sidebar-item" onClick={() => addCategoryForm(true)}>
            <MdOutlineCategory tooltip="Add new Category" />
          </i>
        </OverlayTrigger>
        <AddCategory
          addCategoryTrigger={newCategory}
          addCategoryFormTrigger={addCategoryForm}
        />
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip> Add Budget </Tooltip>}
        >
          <i className="sidebar-item" onClick={() => newBudgetForm(true)}>
            <IoIosCash />
          </i>
        </OverlayTrigger>
        <NewBudget
          newBudgetTrigger={newBudget}
          newBudgetFormTrigger={newBudgetForm}
        />
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip> Log out </Tooltip>}
        >
          <i
            className="sidebar-item"
            onClick={() => {authContext.logout()
            }}
          >
            <AiOutlineLogin />
          </i>
        </OverlayTrigger>
      </div>
    </IconContext.Provider>
  );
}

export default SideBar;
