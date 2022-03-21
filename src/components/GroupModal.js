import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Input } from "../styles";
import AlertMessage from "./AlertMessage";

const GroupModal = ({ show, handleClose, setGroupName, saveGroup, showAlert, setShowAlert, errorMessage, groupName }) => {

    const onCreateClick = () => {
        saveGroup();
    }

    const onKeyPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            onCreateClick();
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Input type="text"
                            value={groupName}
                            placeholder="Enter group name"
                            onKeyPress={(e) => onKeyPress(e)}
                            onChange={(e) => setGroupName(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>
                    {showAlert &&
                        <AlertMessage
                            errorMessage={errorMessage}
                            setShowAlert={setShowAlert}
                        />
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onCreateClick}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GroupModal;