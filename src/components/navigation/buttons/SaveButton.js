import React from "react";
import { CustomButtonDiv, ButtonPrimary } from "../../../styles";

const SaveButton = ({ onUpdateClick }) => {
    return (
        <CustomButtonDiv>
            <ButtonPrimary onClick={onUpdateClick}>
                Save Changes
            </ButtonPrimary>
        </CustomButtonDiv>
    )
}

export default SaveButton