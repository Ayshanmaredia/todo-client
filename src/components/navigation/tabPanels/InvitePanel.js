import React from "react"
import { SearchInput } from "../../../styles";
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

const InvitePanel = ({ setEmail, createInvite, invites }) => {
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