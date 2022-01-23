import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ListModal = ({ show, handleClose, selectedListItem, updateList, deleteList }) => {

    const [updatedItem, setUpdatedItem] = useState();

    useEffect(() => {
        if (selectedListItem) {
            setUpdatedItem({
                id: selectedListItem.id,
                name: selectedListItem.name,
                description: selectedListItem.description,
                status: selectedListItem.status
            })
        }
    }, [selectedListItem])

    const onUpdateClick = () => {
        updateList(updatedItem);
        handleClose();
    }

    const onDeleteClick = () => {
        deleteList(selectedListItem.id);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedListItem &&
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Update item name"
                                defaultValue={selectedListItem.name}
                                onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                placeholder="Add a more detailed description..."
                                defaultValue={selectedListItem.description}
                                onChange={(e) => setUpdatedItem({ ...updatedItem, description: e.target.value })} />
                        </Form.Group>
                    </Form>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onDeleteClick}>
                    Delete
                </Button>
                <Button variant="primary" onClick={onUpdateClick}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ListModal;