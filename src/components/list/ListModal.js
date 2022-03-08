import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Input } from "../../styles";
import SaveButton from "../navigation/buttons/SaveButton";
import DeleteButton from "../navigation/buttons/DeleteButton";
import AlertMessage from "../AlertMessage";

const ListModal = ({ show, handleClose, selectedListItem, updateList, deleteList }) => {

    const [updatedItem, setUpdatedItem] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        setErrorMessage();
        setShowAlert(false);
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
        if (!updatedItem.name) {
            setErrorMessage("Name field cannot be empty");
            setShowAlert(true);
            return;
        }
        updateList(updatedItem);
        handleClose();
    }

    const onDeleteClick = () => {
        deleteList(selectedListItem.id);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedListItem &&
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name*</Form.Label>
                            <Input
                                type="text"
                                placeholder="Update item name"
                                defaultValue={selectedListItem.name}
                                onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Input
                                as="textarea" rows={3}
                                placeholder="Add a more detailed description..."
                                defaultValue={selectedListItem.description}
                                onChange={(e) => setUpdatedItem({ ...updatedItem, description: e.target.value })} />
                        </Form.Group>
                        {showAlert &&
                            <AlertMessage
                                errorMessage={errorMessage}
                                setShowAlert={setShowAlert}
                            />
                        }
                    </Form>
                }
            </Modal.Body>
            <Modal.Footer>
                <DeleteButton
                    onDeleteClick={onDeleteClick}
                />
                <SaveButton
                    onUpdateClick={onUpdateClick}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ListModal;