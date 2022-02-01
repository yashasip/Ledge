import React from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authenticationHandle } from "./state";

import { IconContext } from 'react-icons/lib';
import { MdOutlineCategory } from "react-icons/md";
import { IoIosCash } from "react-icons/io";
import { HiCurrencyRupee } from "react-icons/hi";
import { AiOutlineLogin } from "react-icons/ai";

import AddCategory from './AddCategory';
import NewBudget from './NewBudget';
import './SideBar.css'
import { login } from './state/actions';


function SideBar() {
  const dispatch = useDispatch()
  const { login } = bindActionCreators(authenticationHandle, dispatch);

    const [newCategory, addCategoryForm] = useState(false);
    const [newBudget, newBudgetForm] = useState(false);

    return (
      <IconContext.Provider value={{ color: "#030F33", size: "3.5em" }}>
        <div className="sidebar">
          <i className="sidebar-item" onClick={() => addCategoryForm(true)}>
            <MdOutlineCategory />
          </i>
          <AddCategory
            addCategoryTrigger={newCategory}
            addCategoryFormTrigger={addCategoryForm}
          />
          <i className="sidebar-item"onClick={() => newBudgetForm(true)} >
            <IoIosCash />
          </i>
          <NewBudget newBudgetTrigger={ newBudget }
            newBudgetFormTrigger={newBudgetForm} />
          <i className="sidebar-item">
            <HiCurrencyRupee />
          </i>
          <i className="sidebar-item" onClick={()=>login(false)}>
            <AiOutlineLogin />
          </i>
        </div>
      </IconContext.Provider>
    );
}

export default SideBar;
