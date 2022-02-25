import React from "react";
import { Button } from "react-bootstrap";
import { CustomButtonDiv } from "../../../styles";

const SaveButton = ({ onUpdateClick }) => {
    return (
        <CustomButtonDiv>
            <Button variant="primary" onClick={onUpdateClick}>
                Save Changes
            </Button>
        </CustomButtonDiv>
    )
}

export default SaveButton