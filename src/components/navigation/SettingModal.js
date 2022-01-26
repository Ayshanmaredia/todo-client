import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useData } from "../../DataContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MemberList = styled.ul({
    listStyle: 'none',
    margin: '0',
    padding: '0'
});

const MemberListItem = styled.li({
    backgroundColor: '#f8f9fa',
    marginTop: '3px',
    padding: '5px 15px',
    fontSize: '16px'
});

const CustomButton = styled.button({
    width: '20%',
    border: 'none',
    borderRadius: '5px',
    float: 'right',
    marginLeft: '20px',
    cursor: 'pointer',
    ":hover": {
        backgroundColor: '#198754',
        color: 'white'
    }
})

const AddUserIcon = styled.span({
    padding: '5px'
});

const SettingModal = ({ show, handleClose, updateGroup, deleteGroup, createInvite, setEmail }) => {

    const { name, selectedOwner, members, groupMembersName } = useData();

    const [tempName, setTempName] = useState();

    useEffect(() => {
        groupMembersName();
        if (selectedOwner) {
            setTempName(selectedOwner.owner_type === 1 ? name : selectedOwner.name)
        }
    }, [selectedOwner])

    useEffect(() => {
        groupMembersName();
    }, [])

    const onUpdateClick = () => {
        updateGroup(tempName);
        handleClose();
    }

    const onDeleteClick = () => {
        deleteGroup(selectedOwner.owner_type_id);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedOwner &&
                    <Tabs>
                        <TabList>
                            <Tab>{selectedOwner.owner_type === 0 ? "Group" : "Name"}</Tab>
                            {selectedOwner.owner_type === 0 &&
                                <Tab>Members</Tab>
                            }
                            <Tab>
                                <AddUserIcon>
                                    <FontAwesomeIcon icon="user-plus" />
                                </AddUserIcon>
                                Invite Member
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <Form.Control
                                type="text"
                                defaultValue={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                            />
                        </TabPanel>
                        {selectedOwner.owner_type === 0 &&
                            <TabPanel>
                                <MemberList>
                                    {members.map((member, index) => (
                                        <MemberListItem key={index}>{member.name === name ? "You" : member.name}</MemberListItem>
                                    ))}
                                </MemberList>
                            </TabPanel>
                        }
                        <TabPanel>
                            <div className="d-flex">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email id"
                                    className="w-75"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <CustomButton type="button" onClick={createInvite}>Invite</CustomButton>
                            </div>
                        </TabPanel>
                    </Tabs>}
            </Modal.Body>
            {selectedOwner && selectedOwner.owner_type === 0
                ?
                <Modal.Footer>
                    <Button variant="danger" onClick={onDeleteClick}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={onUpdateClick}>
                        Save Changes
                    </Button>
                </Modal.Footer>
                :
                <Modal.Footer>
                    <Button variant="primary" onClick={onUpdateClick}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            }
        </Modal>
    )
};

export default SettingModal;
