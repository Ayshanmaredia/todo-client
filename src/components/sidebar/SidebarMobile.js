import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../../DataContext";
import GroupItem from "./GroupItem";
import IndividualItem from "./IndividualItem";
import { BurgerMenu } from '../../styles';
import { useNavigate, useLocation } from 'react-router-dom'

const SidebarContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #f3f4f7;
    display: none;
    position: absolute;
    z-index: 1;
    transition: 0.2s all;
    ${props => props.isCollapsed && css`
    width: 0;
    overflow: hidden;
  `};
    @media (max-width: 767px) {
        display: inline-block;
    }
`;

const SideBarHeader = styled.div({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    height: '56px',
    marginLeft: '7px'
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

function SidebarMobile({ groups, setGroups, handleShow, logout }) {

    const { selectedOwner, setSelectedOwner, isCollapsed, toggleSidebarMobile } = useData();

    const navigate = useNavigate()
    const location = useLocation().search;

    const params = new URLSearchParams(location);

    const onNameClick = () => {
        navigate(`/dashboard?owner_type=1`)
        setSelectedOwner({
            owner_type: 1,
            owner_type_id: null,
            name: null
        })
        toggleSidebarMobile();
    }

    const onGroupClick = (group) => {
        navigate(`/dashboard?owner_type=0&owner_type_id=${group.group_id}`)
        setSelectedOwner({
            owner_type: 0,
            owner_type_id: group.group_id,
            name: group.name,
            owner_id: group.owner_id
        })
        toggleSidebarMobile();
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_HOST_URL + "/group/get-groups", {
            method: "GET",
            headers: { token: localStorage.token }
        }).then((res) => res.json())
            .then(result => {
                setGroups(result);
                setOwner(result)
            })

    }, []);

    const setOwner = (groups) => {
        const owner_type = params.get('owner_type');
        const owner_type_id = params.get('owner_type_id');

        if (owner_type === null) {
            navigate(`/dashboard?owner_type=1`)
            setSelectedOwner({
                owner_type: 1,
                owner_type_id: null,
                name: null
            })
        } else if (owner_type === 0 && owner_type_id === null) {
            navigate(`/dashboard?owner_type=1`)
            setSelectedOwner({
                owner_type: 1,
                owner_type_id: null,
                name: null
            })
        } else {
            navigate(`/dashboard?owner_type=${owner_type}&owner_type_id=${owner_type_id}`)
            setSelectedOwner({
                owner_type: parseInt(owner_type),
                owner_type_id: parseInt(owner_type_id),
                name: groups.find((groupItem) => groupItem.group_id === parseInt(owner_type_id)).name
            })
        }
    }

    return (
        <SidebarContainer isCollapsed={isCollapsed}>
            <SideBarHeader>
                <BurgerMenu onClick={toggleSidebarMobile} icon="bars" />
                <h4 className="mt-1">Listicle Board Mobile</h4>
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
                <Button className="w-100" variant="primary" onClick={e => logout(e)}>Logout</Button>
            </SideBarFooter>
        </SidebarContainer>
    )
}

export default SidebarMobile;