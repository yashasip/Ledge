import AlertContext from "./AlertContext";
import { Alert } from "react-bootstrap";
import { useState } from "react";

const AlertState = (props) => {
  const [alert, setAlert] = useState({ show: false, message: "", variant:"" });

    const getAlert = (message, variant="success") => {
        setAlert({ show: true, message:message, variant:variant });
        setTimeout(() => {
            setAlert({ show: false })
        }, 3000);
  }

  return (
      <AlertContext.Provider value={{ alert, getAlert, setAlert }}>
          {
        alert.show?
                  (<Alert variant={alert.variant}>{ alert.message}</Alert>) : null
          }
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
