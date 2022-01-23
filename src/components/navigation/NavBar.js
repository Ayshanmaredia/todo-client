import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../../DataContext";
import SettingModal from "./SettingModal";
import { toast } from "react-toastify";

const NavbarContainer = styled(Navbar)({
    marginBottom: '10px',
    width: '100%'
})

const NavbarBrand = styled(Navbar.Brand)({
    fontWeight: '500'
})

const SettingIcon = styled.span({
    margin: '0 25px',
    fontSize: '22px',
    cursor: 'pointer',
    transition: '0.2s',
    ":hover": {
        color: '#0d6efd',
        transform: 'rotatez(90deg)'
    }
})

const NavBar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { getName, name, selectedOwner, groups, setGroups, setSelectedOwner } = useData();

    useEffect(() => {
        getName();
    });

    const updateGroup = async (groupName) => {

        const body = { "id": selectedOwner.owner_type_id, "name": groupName }

        try {
            const response = await fetch("http://localhost:5000/group/update-group", {
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

            const response = await fetch("http://localhost:5000/group/delete-group", {
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
        <NavbarContainer bg="light" expand="lg">
            <Container fluid>
                {selectedOwner &&
                    <NavbarBrand>{selectedOwner.owner_type === 1 ? name : selectedOwner.name}</NavbarBrand>}
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <SettingIcon onClick={handleShow}><FontAwesomeIcon icon="cog" /></SettingIcon>
                    <SettingModal
                        show={show}
                        handleClose={handleClose}
                        updateGroup={updateGroup}
                        deleteGroup={deleteGroup}
                    />
                </Navbar.Collapse>
            </Container>
        </NavbarContainer>
    )
}

export default NavBar
