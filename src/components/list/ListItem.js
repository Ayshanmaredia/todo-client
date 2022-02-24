import React from "react";
import { Form, Card } from "react-bootstrap";
import styled from "styled-components";
import { SearchInput } from "../../styles";

const CardWrapper = styled(Card)({
    width: '100%',
    margin: '3px 0',
    backgroundColor: '#faf9fa',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0px 0px 4px 0px #cecece',
    transition: 'all .3s ease',
    ":hover": {
        transform: 'scale(1.02)'
    }
});

const FormElement = styled.div({
    display: 'flex',
    alignItems: 'center'
});

const CardTitle = styled(Card.Title)({
    height: '25px',
    width: '100%',
    marginBottom: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: '16px'
});

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
                        <SearchInput autoFocus
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
