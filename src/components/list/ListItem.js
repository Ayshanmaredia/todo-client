import React from "react";
import { Form, Card } from "react-bootstrap";
import styled from "styled-components";

const CardWrapper = styled(Card)({
    width: '35%',
    margin: '5px 0'
});

const FormElement = styled.div({
    display: 'flex',
    alignItems: 'center'
});

const CardTitle = styled(Card.Title)({
    height: '25px',
    marginBottom: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: '1rem'

})

const ListItem = ({ listItem, onKeyPress, onBlur, handleShow, setSelectedListItem, updateList }) => {

    const handleItemClick = (e) => {
        setSelectedListItem(listItem)
        handleShow();
    }

    const toggleStatus = () => {
        const temp_listItem = listItem;
        temp_listItem.status = temp_listItem.status === 1 ? 0 : 1;
        updateList(temp_listItem);
    }

    return (
        <CardWrapper>
            <Card.Body>
                {listItem.isEditing
                    ?
                    <Form>
                        <Form.Control autoFocus
                            type="text" placeholder="Add item"
                            onKeyPress={(e) => onKeyPress(e, listItem.id)}
                            onBlur={(e) => onBlur(e, listItem.id)} />
                    </Form>
                    :
                    <FormElement>
                        <Form.Check type="checkbox" checked={listItem.status === 1} onChange={toggleStatus} />
                        <CardTitle onClick={handleItemClick}>
                            {listItem.name}
                        </CardTitle>
                    </FormElement>
                }
            </Card.Body>
        </CardWrapper>
    )
}

export default ListItem;
