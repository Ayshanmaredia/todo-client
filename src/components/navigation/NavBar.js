import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../../DataContext";
import SettingModal from "./SettingModal";
import SearchBox from "./SearchBox";
import { BurgerMenu } from '../../styles';
import { toast } from "react-toastify";
import { blue } from "../../colors"; 

const NavbarContainer = styled(Navbar)({
    width: '100%',
    backgroundColor: '#faf9fa'
});

const NavWrapper = styled.div({
    display: 'flex',
    flexWrap: 'inherit',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0 7px'
})

const NavbarBrand = styled.div({
    padding: '5px 0',
    marginRight: '16px',
    fontSize: '20px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontWeight: '500'
});

const SettingIcon = styled.span({
    margin: '0 25px',
    fontSize: '22px',
    cursor: 'pointer',
    transition: '0.2s',
    ":hover": {
        color: blue,
        transform: 'rotate(90deg)'
    }
});

const ToggleButton = styled.span({
    "@media (min-width: 768px)": {
        display: 'none'
    }
});

const NavbarItems = styled.div({
    display: 'flex'
});

const NavBar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { getUser, user, selectedOwner, groups, setGroups, setSelectedOwner, toggleSidebarMobile, setSearchValue } = useData();

    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const updateGroup = async (groupName) => {

        const body = { "id": selectedOwner.owner_type_id, "name": groupName }

        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/group/update-group", {
                method: "PUT",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            setSelectedOwner({ ...selectedOwner, name: parseRes.name })

            setGroups(groups.map((group) => {
                if (group.group_id === parseRes.id) {
                    return { ...group, name: parseRes.name }
                }
                return group;
            }))

        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteGroup = async (id) => {
        try {

            const body = { "id": id }

            const response = await fetch(process.env.REACT_APP_HOST_URL + "/group/delete-group", {
                method: "DELETE",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)

            });

            if (response.status === 200) {
                setGroups(groups.filter((group) => {
                    return group.group_id !== id && group
                }))
                toast.success("Item deleted successfully");
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <NavbarContainer expand="lg">
            <NavWrapper>
                {selectedOwner &&
                    <NavbarBrand>
                        <ToggleButton className="md-hidden" onClick={toggleSidebarMobile}>
                            <BurgerMenu icon="bars" />
                        </ToggleButton>
                        {selectedOwner.owner_type === 1 ? user.name : selectedOwner.name}
                    </NavbarBrand>
                }
                <NavbarItems>
                    <SearchBox
                        className="search-container"
                        handleChange={handleChange}
                    />
                    <SettingIcon onClick={handleShow}>
                        <FontAwesomeIcon icon="cog" />
                    </SettingIcon>
                </NavbarItems>
                {
                    show &&
                    <SettingModal
                        show={show}
                        handleClose={handleClose}
                        updateGroup={updateGroup}
                        deleteGroup={deleteGroup}
                    />
                }
            </NavWrapper>
        </NavbarContainer>
    )
}

export default NavBar
