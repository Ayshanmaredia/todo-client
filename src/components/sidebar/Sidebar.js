import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../../DataContext";
import GroupItem from "./GroupItem";
import IndividualItem from "./IndividualItem";

const SidebarContainer = styled.div({
    height: '100vh',
    width: '225px',
    backgroundColor: '#f3f4f7',
    display: 'inline-block'
});

const SideBarHeader = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '56px'
});

const SideBarBody = styled.div({
    height: 'calc(100% - 106px)',
    overflowY: 'scroll',
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
    color: '#253858',
    fontWeight: '500',
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

const SideBarItem = styled.li({
    marginTop: '5px',
    padding: '10px 15px',
    fontSize: '16px',
    listStyle: 'none',
    cursor: 'pointer',
    ":hover": {
        backgroundColor: '#0d6efd',
        color: 'white'
    }
});

function Sidebar({ groups, setGroups, handleShow, logout }) {

    const { selectedOwner, setSelectedOwner } = useData();

    const onNameClick = () => {
        setSelectedOwner({
            owner_type: 1,
            owner_type_id: null,
            name: null
        })
    }

    const onGroupClick = (group) => {
        setSelectedOwner({
            owner_type: 0,
            owner_type_id: group.group_id,
            name: group.name
        })
    }

    useEffect(() => {
        getGroups();
        setSelectedOwner({
            owner_type: 1,
            owner_type_id: null,
            name: null
        })
    }, []);

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
                    SideBarItem={SideBarItem}
                />
                <GroupList>
                    <GroupListHeader>
                        <GroupFontIcon><FontAwesomeIcon icon="users" /></GroupFontIcon>
                        Groups
                        <GroupAddButton icon="plus-square" onClick={handleShow} />
                    </GroupListHeader>
                    {groups.map((group, index) => (
                        <GroupItem
                            index={index}
                            onGroupClick={onGroupClick}
                            group={group}
                            selectedOwner={selectedOwner}
                            owner_type={0}
                            SideBarItem={SideBarItem}
                        />
                    ))
                    }
                </GroupList>
            </SideBarBody>
            <SideBarFooter>
                <Button className="w-100" variant="primary" onClick={e => logout(e)}>Logout</Button>
            </SideBarFooter>
        </SidebarContainer>
    )
}

export default Sidebar;