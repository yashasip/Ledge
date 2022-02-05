import React, { useContext } from "react";
import { useState } from "react";
import { Card, Tabs, Tab, Form, Button, Fade } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authenticationHandle } from "./state";

import LoginContext from "../context/Login/LoginContext";
import AccountContext from "../context/Account/AccountContext";
import CategoryContext from "../context/Category/CategoryContext";
import TransactionContext from "../context/Transaction/TransactionContext";
import CurrencyContext from "../context/Currency/CurrencyContext";
import BudgetContext from "../context/Budget/BudgetContext";
import AlertContext from "../context/Alert/AlertContext";

import "./SignIn.css";

function LoginForm() {
  const loginContext = useContext(LoginContext);
  const accountContext = useContext(AccountContext);
  const transactionContext = useContext(TransactionContext);
  const categoryContext = useContext(CategoryContext);
  const budgetContext = useContext(BudgetContext);
  const currencyContext = useContext(CurrencyContext);
  const alertContext = useContext(AlertContext);

  const dispatch = useDispatch();
  const { login } = bindActionCreators(authenticationHandle, dispatch);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  // let navigator = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/User/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.status === "success") {
      localStorage.setItem("LedgeSessionToken", json.token);
      login(true);
      loginContext.setUsername(credentials.username);
      console.log("success");
      accountContext.getAccounts();
      transactionContext.getTransactions();
      categoryContext.getCategories();
      currencyContext.getCurrencies();
      budgetContext.getTotalSpent();
      alertContext.getAlert("Log In Succesful!");
    } else {
      console.log("failure");
      alertContext.getAlert("Invalid username or password", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <Form className="tab-form-grid" onSubmit={handleLogin}>
      <Form.Group id="user-email" className="mb-3 spread-wide">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={onChange}
          placeholder="Enter username"
        />
      </Form.Group>
      <Form.Group id="user-password" className="mb-3 spread-wide">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={onChange}
          placeholder="Enter password"
        />
      </Form.Group>
      <Button
        variant="outline-dark"
        className="tab-button"
        id="login-button"
        type="submit"
      >
        Login
      </Button>
    </Form>
  );
}

function SignUpForm() {
  const loginContext = useContext(LoginContext);
  const accountContext = useContext(AccountContext);
  const transactionContext = useContext(TransactionContext);
  const categoryContext = useContext(CategoryContext);
  const budgetContext = useContext(BudgetContext);
  const currencyContext = useContext(CurrencyContext);
  const alertContext = useContext(AlertContext);

  const dispatch = useDispatch();
  const { login } = bindActionCreators(authenticationHandle, dispatch);

  const [credentials, setCredentials] = useState({
    userEmail: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  // let navigator = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/User/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.userEmail,
        username: credentials.username,
        first_name: credentials.firstName,
        last_name: credentials.lastName,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.status === "success") {
      localStorage.setItem("LedgeSessionToken", json.token);
      login(true);
      loginContext.setUsername(credentials.username);
      console.log("success");
      accountContext.getAccounts();
      transactionContext.getTransactions();
      categoryContext.getCategories();
      budgetContext.getTotalSpent();
      currencyContext.getCurrencies();
      alertContext.getAlert("Account Created Succesfully! Signed In");
    } else {
      console.log("failure");
      alertContext.getAlert(
        "Could not Sign Up, Sign up Details Invalid",
        "danger"
      );
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Form className="tab-form-grid" onSubmit={handleSignUp}>
      <Form.Group className="mb-3 spread-wide">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          id="username"
          name="username"
          onChange={onChange}
          placeholder="Enter Username"
        />
      </Form.Group>
      <Form.Group className="mb-3 spread-wide">
        <Form.Label>Email ID</Form.Label>
        <Form.Control
          type="email"
          id="userEmail"
          onChange={onChange}
          name="userEmail"
          placeholder="Enter Email ID"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          id="firstName"
          onChange={onChange}
          name="firstName"
          placeholder="First Name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          id="lastName"
          onChange={onChange}
          name="lastName"
          placeholder="Last Name"
        />
      </Form.Group>
      <Form.Group className="mb-3 spread-wide">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          onChange={onChange}
          name="password"
          placeholder="Enter Password"
        />
      </Form.Group>
      <Form.Group className="mb-3 spread-wide">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          onChange={onChange}
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Re-enter Password"
        />
      </Form.Group>
      <Button variant="outline-dark" className="tab-button" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}

function SignIn() {
  const [tab, setTab] = useState("login");

  return (
    <div className="sign-in">
      <Card className="sign-in-inner">
        <Card.Body>
          <h2 className="nav-brand">Ledge</h2>
          <hr className="signin-line" />
          <Tabs
            className="signin-tab"
            activeKey={tab}
            onSelect={(k) => setTab(k)}
            transition={Fade}
          >
            <Tab eventKey="login" title="Login">
              <LoginForm />
            </Tab>
            <Tab eventKey="signup" title="Sign Up">
              <SignUpForm />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
}
export default SignIn;
