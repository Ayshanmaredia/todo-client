import React, { useEffect, useState } from "react"
import { SearchInput } from "../../../styles";
import { useData } from "../../../DataContext";
import styled from "styled-components";
import { MembersList, MembersName } from "../../../styles";

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

    const [email, setEmail] = useState("");
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        getInvite();
    }, [])

    const createInvite = async () => {

        const body = { "email": email, "group_id": selectedOwner.owner_type_id }

        try {
            await fetch(process.env.REACT_APP_HOST_URL + "/invite/create-invite", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err.message);
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
                <SearchInput
                    type="email"
                    placeholder="Enter email id"
                    className="w-75"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InviteButton type="button" onClick={createInvite}>Invite</InviteButton>
            </div>
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