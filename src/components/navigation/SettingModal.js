import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useData } from "../../DataContext";

const SettingModal = ({ show, handleClose, updateGroup, deleteGroup }) => {


    const { name, selectedOwner, setSelectedOwner } = useData();

    const [tempName, setTempName] = useState();

    useEffect(() => {
        if (selectedOwner) {
            setTempName(selectedOwner.owner_type === 1 ? name : selectedOwner.name)
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
        <Modal show={show} onHide={handleClose} centered size="lg">
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
                                <h2>Any content 2</h2>
                            </TabPanel>
                        }

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
