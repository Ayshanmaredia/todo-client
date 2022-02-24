import React from "react";
import styled from "styled-components";
import { SideBarItem } from '../../styles';


const ListItem = styled(SideBarItem)({
    color: props=> props.color,
    backgroundColor: props=> props.backgroundColor,
});

function IndividualItem({ onNameClick, selectedOwner, owner_type }) {


    return (
        <ListItem
            color={selectedOwner && selectedOwner.owner_type === owner_type ? "rgba(0, 0, 0, 0.6)" : "#000"} 
            backgroundColor = {selectedOwner && selectedOwner.owner_type === owner_type ? "#ececef" : "transparent"}
            onClick={onNameClick}>
            My list
        </ListItem>
    )
}

export default IndividualItem;