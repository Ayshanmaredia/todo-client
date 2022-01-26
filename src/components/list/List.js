import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListItem from "./ListItem";
import ListModal from "./ListModal";
import { useData } from "../../DataContext";
import NavBar from "../navigation/NavBar";

const ListContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
})

const ListWrapper = styled.div({
    height: 'calc(100% - 56px)',
    width: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

const List = () => {

    const [lists, setLists] = useState([]);
    const [selectedListItem, setSelectedListItem] = useState();
    const [selectedId, setSelectedId] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { selectedOwner } = useData();

    useEffect(() => {
        if (selectedOwner) {
            getList();
        }
    }, [selectedOwner]);

    const handleClick = () => {
        addList();
    }

    const addList = () => {
        const list_id = Math.floor(Math.random() * 100);
        setLists([{
            id: list_id,
            name: "",
            owner_type: 0,
            description: "",
            status: 0,
            isEditing: true
        }, ...lists]);
    }

    useEffect(() => {
        if (selectedId) {
            saveList(selectedId);
        }
    }, [lists])

    const onKeyPress = (e, id) => {
        if (e.charCode === 13) {
            e.preventDefault();
            if (e.target.value === "") {
                removeEmptyList(id);
            } else {
                editList(e, id);
                // createList(id);
            }
        }
    }

    const removeEmptyList = (id) => {
        setLists(lists.filter((list) => {
            if (list.id !== id) {
                return list;
            }
        }))
    }

    const editList = (e, id) => {
        setSelectedId(id);
        setLists(lists.map((list) => {
            if (list.id === id) {
                return { ...list, name: e.target.value, isEditing: false }
            }
            return list;
        }));
    }

    const onBlur = (e, id) => {
        if (e.target.value === "") {
            removeEmptyList(id);
        } else {
            editList(e, id);
        }
    }


    const saveList = async (id) => {
        const list = lists.find(listItem => listItem.id === id);

        try {
            const body = { "name": list.name, "owner_type": selectedOwner.owner_type, "owner_type_id": selectedOwner.owner_type_id, "description": null, "status": 0 }

            const response = await fetch(process.env.REACT_APP_HOST_URL + "/list/create-list", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (response.status === 200) {
                setSelectedId(null);
                setLists(lists.map((item) => {
                    if (item.id === list.id) {
                        return { id: parseRes.id, ...item }
                    }
                    return item;
                }))
                toast.success("Item added successfully");
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    const getList = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/list/get-lists", {
                method: "GET",
                headers: { "owner_type": selectedOwner.owner_type, "owner_type_id": selectedOwner.owner_type_id, token: localStorage.token }
            });

            const parseRes = await response.json();

            setLists(parseRes.map(element => {
                return { ...element, isEditing: false }
            }))

        } catch (err) {
            console.error(err.message)
        }
    }

    const updateList = async (listItem) => {

        const body = { "id": listItem.id, "name": listItem.name, "description": listItem.description, "status": listItem.status }

        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/list/update-list", {
                method: "PUT",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            setLists(lists.map((item) => {
                if (item.id === parseRes.id) {
                    return { ...item, name: parseRes.name, description: parseRes.description }
                }
                return item;
            }))

        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteList = async (id) => {
        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/list/delete-list", {
                method: "DELETE",
                headers: { "id": id, token: localStorage.token }
            });

            if (response.status === 200) {
                setLists(lists.filter((item) => {
                    return item.id !== id && item
                }))
                toast.success("Item deleted successfully");
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <ListContainer>
            <NavBar />
            <ListWrapper>
                <Button variant="primary" onClick={handleClick}>Add an item</Button>
                {
                    lists.map((listItem, index) => (
                        <ListItem key={index}
                            listItem={listItem}
                            onKeyPress={onKeyPress}
                            onBlur={onBlur}
                            handleShow={handleShow}
                            setSelectedListItem={setSelectedListItem}
                            updateList={updateList}
                        />
                    ))
                }
            </ListWrapper>

            <ListModal
                show={show}
                handleClose={handleClose}
                selectedListItem={selectedListItem}
                updateList={updateList}
                deleteList={deleteList}
            />
        </ListContainer>
    )
}

export default List;
