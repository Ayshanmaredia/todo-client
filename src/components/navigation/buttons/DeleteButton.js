import React from "react"
import { CustomButtonDiv, ButtonDanger } from "../../../styles";

const DeleteButton = ({ onDeleteClick }) => {
    return (
        <CustomButtonDiv>
            <ButtonDanger onClick={onDeleteClick}>
                Delete
            </ButtonDanger>
        </CustomButtonDiv>
    )
}

export default DeleteButton