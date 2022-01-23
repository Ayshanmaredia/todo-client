import React from "react";
import styled from "styled-components";

function IndividualItem({ onNameClick, selectedOwner, owner_type, SideBarItem }) {

    const ListItem = styled(SideBarItem)({
        color: selectedOwner && selectedOwner.owner_type === owner_type ? "#fff" : "#000",
        backgroundColor: selectedOwner && selectedOwner.owner_type === owner_type ? "#0d6efd" : "transparent"
    });

    return (
        <ListItem onClick={onNameClick}>
            My list
        </ListItem>
    )
}

export default IndividualItem;