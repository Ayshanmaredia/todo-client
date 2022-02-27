import React, { useEffect, useState } from "react"
import { Input } from "../../../styles";
import { useData } from "../../../DataContext";
import styled from "styled-components";
import { MembersList, MembersName } from "../../../styles";
import AlertMessage from "../../AlertMessage";

const InviteButton = styled.button({
    width: '20%',
    border: 'none',
    borderRadius: '5px',
    float: 'right',
    marginLeft: '20px',
    cursor: 'pointer',
    ":hover": {
        backgroundColor: '#198754',
        color: 'white'
    }
});

const InvitePanel = () => {

    const { selectedOwner } = useData();

    const [email, setEmail] = useState();
    const [invites, setInvites] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        getInvite();
    }, [])

    const alertMessage = (message) => {
        setErrorMessage(message);
        setShowAlert(true);
    }

    const createInvite = async () => {

        if (!email) {
            alertMessage("Email field cannot be empty");
            return;
        }

        const body = { "email": email, "group_id": selectedOwner.owner_type_id }

        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/invite/create-invite", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

            if (response.status === 401) {
                alertMessage(await response.text());
                return;
            }

            const parseRes = await response.json();
            setInvites([...invites, parseRes]);

        } catch (err) {
            alertMessage(err.message);
        }
    }

    const getInvite = async () => {

        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/invite/get-invite", {
                method: "GET",
                headers: { "group_id": selectedOwner.owner_type_id, token: localStorage.token }
            });

            const parseRes = await response.json();

            setInvites(parseRes);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <div className="d-flex">
                <Input
                    type="email"
                    placeholder="Enter email id"
                    className="w-75"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InviteButton type="button" onClick={createInvite}>Invite</InviteButton>
            </div>
            {showAlert &&
                <AlertMessage
                    errorMessage={errorMessage}
                    setShowAlert={setShowAlert}
                />
            }
            <div>
                <MembersList>
                    {invites.map((invite, index) => (
                        <MembersName key={index}>{invite.invited_to}</MembersName>
                    ))}
                </MembersList>
            </div>
        </>
    )
}

export default InvitePanel