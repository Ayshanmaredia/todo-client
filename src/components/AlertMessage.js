import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ errorMessage, setShowAlert }) => {
    return (
        <div className="my-2">
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                {errorMessage}
            </Alert>
        </div>
    )
}

export default AlertMessage