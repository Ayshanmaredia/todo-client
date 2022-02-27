import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useData } from "../../DataContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NamePanel from "./tabPanels/NamePanel";
import MembersPanel from "./tabPanels/MembersPanel";
import InvitePanel from "./tabPanels/InvitePanel";
import SaveButton from "./buttons/SaveButton";
import DeleteButton from "./buttons/DeleteButton";
import AlertMessage from "../AlertMessage";

const AddUserIcon = styled.span({
    padding: '5px'
});

const SettingModal = ({ show, handleClose, updateGroup, deleteGroup }) => {

    const { user, selectedOwner, groupMembersName } = useData();

    const [tempName, setTempName] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        groupMembersName();
        if (selectedOwner) {
            setTempName(selectedOwner.owner_type === 1 ? user.name : selectedOwner.name)
        }
    }, [selectedOwner])

    const onUpdateClick = () => {
        if (!tempName) {
            setErrorMessage("Name field cannot be empty");
            setShowAlert(true);
            return;
        }
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
                            <NamePanel
                                tempName={tempName}
                                setTempName={setTempName}
                            />
                            {showAlert &&
                                <AlertMessage
                                    errorMessage={errorMessage}
                                    setShowAlert={setShowAlert}
                                />
                            }
                            {selectedOwner && selectedOwner.owner_type === 0
                                ?
                                <>
                                    {selectedOwner.owner_id === user.id &&
                                        <DeleteButton
                                            onDeleteClick={onDeleteClick}
                                        />
                                    }
                                    <SaveButton
                                        onUpdateClick={onUpdateClick}
                                    />
                                </>
                                :
                                <SaveButton
                                    onUpdateClick={onUpdateClick}
                                />
                            }
                        </TabPanel>
                        {selectedOwner.owner_type === 0 &&
                            <TabPanel>
                                <MembersPanel />
                            </TabPanel>
                        }
                        {selectedOwner.owner_type === 0 &&
                            <TabPanel>
                                <InvitePanel />
                            </TabPanel>
                        }
                    </Tabs>
                }
            </Modal.Body>
        </Modal>
    )
};

export default SettingModal;
