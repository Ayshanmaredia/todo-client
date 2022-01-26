import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const Invite = () => {

    useEffect(() => {
        checkInvite();
    });

    const search = useLocation().search
    const navigate = useNavigate();

    const checkInvite = async () => {

        const inviteToken = new URLSearchParams(search).get('inviteToken')

        try {
            const response = await fetch(process.env.REACT_APP_HOST_URL + "/invite", {
                method: "POST",
                headers: { invitetoken: inviteToken }
            })

            const parseRes = await response.json();

            if (response.status === 200) {
                localStorage.setItem("invitetoken", inviteToken)
                navigate("/register");
            } else {
                navigate("/login");
            }

            if (parseRes.length === 0) {
                navigate("/register");
            } else {
                navigate("/login");
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>

        </div>
    )
}

export default Invite
