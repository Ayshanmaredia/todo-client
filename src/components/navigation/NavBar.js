import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../../DataContext";
import SettingModal from "./SettingModal";
import { BurgerMenu } from '../../styles';
import { toast } from "react-toastify";

const NavbarContainer = styled(Navbar)({
    marginBottom: '10px',
    width: '100%'
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
        color: '#0d6efd',
        transform: 'rotatez(90deg)'
    }
});

const ToggleButton = styled.span({
    "@media (min-width: 768px)": {
        display: 'none',
    }
});

const NavbarItems = styled.div({
    display: 'flex',
    flexDirection: 'row-reverse'
});

const NavBar = () => {

    const [email, setEmail] = useState("");

    const [invites, setInvites] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { getUser, user, selectedOwner, groups, setGroups, setSelectedOwner, toggleSidebarMobile } = useData();

    useEffect(() => {
        getUser();
    });

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

    const createInvite = async () => {

        const body = { "email": email, "group_id": selectedOwner.owner_type_id }

        try {
            await fetch(process.env.REACT_APP_HOST_URL + "/invite/create-invite", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err.message);
        }
    }

    const getInvite = async () => {

        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/invite/get-invite", {
                method: "GET",
                headers: { "group_id": selectedOwner.owner_type_id, token: localStorage.token }
            });

            const parseRes = await response.json();

            setInvites(parseRes);

        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <NavbarContainer bg="light" expand="lg">
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
                    <SettingIcon onClick={handleShow}>
                        <FontAwesomeIcon icon="cog" />
                    </SettingIcon>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </NavbarItems>
                {
                    show &&
                    <SettingModal
                        show={show}
                        handleClose={handleClose}
                        updateGroup={updateGroup}
                        deleteGroup={deleteGroup}
                        createInvite={createInvite}
                        setEmail={setEmail}
                        getInvite={getInvite}
                        invites={invites}
                    />
                }
            </NavWrapper>
        </NavbarContainer>
    )
}

export default NavBar
