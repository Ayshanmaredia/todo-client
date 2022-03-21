import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import SidebarMobile from "./sidebar/SidebarMobile";
import GroupModal from "./GroupModal";
import List from "./list/List";
import { useData } from "../DataContext";
import { useNavigate } from "react-router-dom";

const DashboardContainer = styled.div({
    width: '100%',
    height: '100vh',
    display: 'inline-flex',
    position: 'relative',
});

const DashboardBody = styled.div({
    width: 'calc(100% - 225px)',
    height: '100%',
    display: 'inline-block',
    backgroundColor: '#ececef',
    "@media (max-width: 767px)": {
        width: '100%'
    }
});

const Dashboard = ({ isAuth }) => {

    const { groups, setGroups } = useData();
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const checkIsAuth = async () => {
            const isAutheticated = await isAuth();
            if (!isAutheticated) {
                navigate('/login');
            }
        }
        checkIsAuth();
    }, [])

    async function saveGroup() {

        try {
            const emptyField = groupName.replace(/ /g, '').length

            if (!groupName || emptyField === 0) {
                setErrorMessage("Field cannot be empty");
                setShowAlert(true);
                setGroupName("");
                return;
            }

            const body = { name: groupName }

            const response = await fetch(process.env.REACT_APP_HOST_URL + "/group/create-group", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            setGroups([...groups, parseRes]);
            setGroupName("");
            handleClose();

        } catch (err) {
            console.error(err.message);
        }
    }

    let tokensToRemove = ["token", "invitetoken"];

    const logout = (e) => {
        e.preventDefault();
        tokensToRemove.forEach(token =>
            localStorage.removeItem(token));
        navigate('/login');
        toast.success("Logout successfully")
    };

    return (
        <DashboardContainer>
            <Sidebar
                groups={groups}
                setGroups={setGroups}
                handleShow={handleShow}
                logout={logout}
            />
            <SidebarMobile
                groups={groups}
                setGroups={setGroups}
                handleShow={handleShow}
                logout={logout}
            />

            <DashboardBody>
                <List />
            </DashboardBody>

            <GroupModal
                show={show}
                handleClose={handleClose}
                setGroupName={setGroupName}
                saveGroup={saveGroup}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                errorMessage={errorMessage}
                groupName={groupName}
            />
        </DashboardContainer>
    );
};

export default Dashboard;