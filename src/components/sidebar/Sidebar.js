import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../../DataContext";
import GroupItem from "./GroupItem";
import IndividualItem from "./IndividualItem";
import { useNavigate, useLocation } from 'react-router-dom'

const SidebarContainer = styled.div({
    height: '100vh',
    width: '225px',
    backgroundColor: '#faf9fa',
    display: 'inline-block',
    "@media (max-width: 768px)": {
        display: 'none',
    }
});

const SideBarHeader = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '56px'
});

const SideBarBody = styled.div({
    padding: '0 10px',
    height: 'calc(100% - 106px)',
    overflowY: 'auto',
    scrollBehavior: 'smooth'
});

const SideBarFooter = styled.div({
    height: '40px'
});

const GroupList = styled.ul({
    listStyle: 'none',
    padding: '0'
});

const GroupListHeader = styled.div({
    marginTop: '10px',
    padding: '2px 15px',
    fontSize: '18px',
    color: '#253858'
});

const GroupFontIcon = styled.span({
    margin: '0 5px'
});

const GroupAddButton = styled(FontAwesomeIcon)({
    float: 'right',
    marginTop: '5px',
    cursor: 'pointer',
    ":hover": {
        color: "#0d6efd"
    }
});

function Sidebar({ groups, setGroups, handleShow, logout }) {

    const { selectedOwner, setSelectedOwner } = useData();
    const navigate = useNavigate()

    const location = useLocation().search;

    const params = new URLSearchParams(location);

    const onNameClick = () => {
        navigate(`/dashboard/?owner_type=1`)
        setSelectedOwner({
            owner_type: 1,
            owner_type_id: null,
            name: null
        })
    }

    const onGroupClick = (group) => {
        navigate(`/dashboard/?owner_type=0&owner_type_id=${group.group_id}`)
        setSelectedOwner({
            owner_type: 0,
            owner_type_id: group.group_id,
            name: group.name,
            owner_id: group.owner_id
        })
    }

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_HOST_URL + "/group/get-groups", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
                const parseRes = await response.json();
                setGroups(parseRes);

            } catch (err) {
                console.error(err.message)
            }
        }
        getGroups();
        const owner_type = params.get('owner_type');
        const owner_type_id = params.get('owner_type_id');

        if (owner_type === null) {
            navigate(`/dashboard/?owner_type=1`)
        } else if (owner_type === 0 && owner_type_id === null) {
            navigate(`/dashboard/?owner_type=1`)
        } 
    }, []);

    return (
        <SidebarContainer>
            <SideBarHeader>
                <h4>Listicle Board</h4>
            </SideBarHeader>
            <SideBarBody>
                <IndividualItem
                    onNameClick={onNameClick}
                    selectedOwner={selectedOwner}
                    owner_type={1}
                />
                <GroupList>
                    <GroupListHeader>
                        <GroupFontIcon><FontAwesomeIcon icon="users" /></GroupFontIcon>
                        Groups
                        <GroupAddButton icon="plus-square" onClick={handleShow} />
                    </GroupListHeader>
                    {groups.map((group, index) => (
                        <GroupItem
                            key={index}
                            onGroupClick={onGroupClick}
                            group={group}
                            selectedOwner={selectedOwner}
                            owner_type={0}
                        />
                    ))
                    }
                </GroupList>
            </SideBarBody>
            <SideBarFooter>
                <Button className="w-100" variant="danger" onClick={e => logout(e)}>Logout</Button>
            </SideBarFooter>
        </SidebarContainer>
    )
}

export default Sidebar;