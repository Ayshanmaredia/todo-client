import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from '../../DataContext';

const Invite = () => {

    const { getInviteDetails } = useData();

    const search = useLocation().search

    useEffect(() => {
        checkInvite();
    });

    const navigate = useNavigate();

    const checkInvite = async () => {

        const inviteToken = new URLSearchParams(search).get('invitetoken')

        const response = await getInviteDetails(inviteToken);

        if (response.status === 200) {
            localStorage.setItem("invitetoken", inviteToken)
            navigate("/register");
        } else {
            alert("Invalid Token");
            navigate("/login");
        }
    }

    return (
        <div>

        </div>
    )
}

export default Invite
