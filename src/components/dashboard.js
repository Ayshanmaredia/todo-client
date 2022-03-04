import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import SidebarMobile from "./sidebar/SidebarMobile";
import GroupModal from "./GroupModal";
import List from "./list/List";
import { useData } from "../DataContext";

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

const Dashboard = ({ setAuth }) => {

    const { groups, setGroups } = useData();

    const [groupName, setGroupName] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function saveGroup() {
        try {

            const body = { name: groupName }

            const response = await fetch(process.env.REACT_APP_HOST_URL + "/group/create-group", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            setGroups([...groups, parseRes]);
            setGroupName("");

        } catch (err) {
            console.error(err.message);
        }
    }

    let tokensToRemove = ["token", "invitetoken"];

    const logout = (e) => {
        e.preventDefault();
        tokensToRemove.forEach(token =>
            localStorage.removeItem(token))
        setAuth(false);
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
            />
        </DashboardContainer>
    );
};

export default Dashboard;