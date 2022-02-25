import React from "react"
import { Button } from "react-bootstrap";
import { CustomButtonDiv } from "../../../styles";

const DeleteButton = ({ onDeleteClick }) => {
    return (
        <CustomButtonDiv>
            <Button variant="danger" onClick={onDeleteClick}>
                Delete
            </Button>
        </CustomButtonDiv>
    )
}

export default DeleteButton