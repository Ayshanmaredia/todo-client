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

        const parseRes = await response.json();

        if (response.status === 200 || parseRes.length === 0) {
            localStorage.setItem("invitetoken", inviteToken)
            navigate("/register");
        } else {
            navigate("/login");
            alert("Invalid Token");
        }
    }

    return (
        <div>

        </div>
    )
}

export default Invite
