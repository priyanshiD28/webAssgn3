import Card from "react-bootstrap/esm/Card";
import Alert from "react-bootstrap/esm/Alert";
import { useState } from "react";

const AlertMessage = ({isSuccess, isFail, setDisplay, message}) => {
    
    return (

        isFail ?
            <Alert className="my-4" variant={isSuccess ? "success" : "danger"} onClose={() => setDisplay(false)} dismissible>
              <p className="text-center">
                { message }
              </p>
            </Alert> :
            <Alert className="my-4" variant={isSuccess ? "success" : "danger"} >
            <p className="text-center">
               { message }
            </p>
          </Alert> 
          
    )
}

export default AlertMessage;