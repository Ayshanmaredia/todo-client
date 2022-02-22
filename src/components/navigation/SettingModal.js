import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useData } from "../../DataContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomButtonDiv = styled.div({
    margin: '5px',
    display: 'inline-block',
});

const MembersList = styled.ul({
    listStyle: 'none',
    margin: '0',
    padding: '0'
});

const MembersName = styled.li({
    backgroundColor: '#f8f9fa',
    marginTop: '3px',
    padding: '5px 15px',
    fontSize: '16px'
});

const InviteButton = styled.button({
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
});

const AddUserIcon = styled.span({
    padding: '5px'
});

const SettingModal = ({ show, handleClose, updateGroup, deleteGroup, createInvite, setEmail, getInvite, invites }) => {

    const { user, selectedOwner, members, groupMembersName } = useData();

    const [tempName, setTempName] = useState();

    useEffect(() => {
        groupMembersName();
        getInvite();
        if (selectedOwner) {
            setTempName(selectedOwner.owner_type === 1 ? user.name : selectedOwner.name)
        }
    }, [selectedOwner])

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
                                <>
                                    <Tab>Members</Tab>
                                    <Tab>
                                        <AddUserIcon>
                                            <FontAwesomeIcon icon="user-plus" />
                                        </AddUserIcon>
                                        Invite Member
                                    </Tab>
                                </>
                            }
                        </TabList>
                        <TabPanel>
                            <Form.Control
                                type="text"
                                defaultValue={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                            />
                            {selectedOwner && selectedOwner.owner_type === 0
                                ?
                                <>
                                    {selectedOwner.owner_id === user.id &&
                                        <CustomButtonDiv>
                                            <Button variant="danger" onClick={onDeleteClick}>
                                                Delete
                                            </Button>
                                        </CustomButtonDiv>
                                    }
                                    <CustomButtonDiv>
                                        <Button variant="primary" onClick={onUpdateClick}>
                                            Save Changes
                                        </Button>
                                    </CustomButtonDiv>
                                </>
                                :
                                <>
                                    <CustomButtonDiv>
                                        <Button variant="primary" onClick={onUpdateClick}>
                                            Save Changes
                                        </Button>
                                    </CustomButtonDiv>
                                </>
                            }
                        </TabPanel>
                        {selectedOwner.owner_type === 0 &&
                            <TabPanel>
                                <MembersList>
                                    {members.map((member, index) => (
                                        <MembersName key={index}>{member.name === user.name ? "You" : member.name}</MembersName>
                                    ))}
                                </MembersList>
                            </TabPanel>
                        }
                        {selectedOwner.owner_type === 0 &&
                            <TabPanel>
                                <div className="d-flex">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email id"
                                        className="w-75"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InviteButton type="button" onClick={createInvite}>Invite</InviteButton>
                                </div>
                                <div>
                                    <MembersList>
                                        {invites.map((invite, index) => (
                                            <MembersName key={index}>{invite.invited_to}</MembersName>
                                        ))}
                                    </MembersList>
                                </div>
                            </TabPanel>
                        }
                    </Tabs>
                }
            </Modal.Body>
        </Modal >
    )
};

export default SettingModal;
