import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function GroupModal({ show, handleClose, setGroupName, saveGroup }) {

    const onCreateClick = () => {
        saveGroup();
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter group name" onChange={(e) => setGroupName(e.target.value)} />
                    </Form.Group>
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