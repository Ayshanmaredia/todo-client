import React from "react";
import styled from "styled-components";
import { SideBarItem } from '../../styles';
import { blue } from "../../colors";

const ListItem = styled(SideBarItem)({
    color: props => props.color,
    backgroundColor: props => props.backgroundColor,
});


function GroupItem({ onGroupClick, group, selectedOwner, owner_type }) {

    return (
        <ListItem
            color={selectedOwner && selectedOwner.owner_type === owner_type && selectedOwner.owner_type_id === group.group_id ? "#fff" : "#000"}
            backgroundColor={selectedOwner && selectedOwner.owner_type === owner_type && selectedOwner.owner_type_id === group.group_id ? blue : "transparent"}
            onClick={() => onGroupClick(group)}>{group.name}
        </ListItem>
    )
}

export default GroupItem;