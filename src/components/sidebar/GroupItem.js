import React from "react";
import styled from "styled-components";

function GroupItem({ index, onGroupClick, group, selectedOwner, owner_type, SideBarItem }) {

    const ListItem = styled(SideBarItem)({
        color: selectedOwner && selectedOwner.owner_type === owner_type && selectedOwner.owner_type_id === group.group_id ? "#fff" : "#000",
        backgroundColor: selectedOwner && selectedOwner.owner_type === owner_type && selectedOwner.owner_type_id === group.group_id ? "#0d6efd" : "transparent"
    });

    return (
        <ListItem key={index} onClick={() => onGroupClick(group)}>{group.name}</ListItem>
    )
}

export default GroupItem;