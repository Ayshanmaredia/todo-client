import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useData } from "../DataContext";

const Register = ({ isAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });
    const { getInviteDetails } = useData();
    const navigate = useNavigate();

    const { email, password, name } = inputs;

    useEffect(() => {
        const checkIsAuth = async () => {
            const isAutheticated = await isAuth();
            if (isAutheticated) {
                navigate('/login');
            }
        }
        checkIsAuth();
    }, [])

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    async function processInviteToken(inviteToken) {

        // 1. Call invite api and get dcrypted token 
        const response = await getInviteDetails(inviteToken);

        const parseRes = await response.json();

        // 2. Update group_user_mapping
        await updateGroupUserMapping(parseRes.group_id);

        // 3. update invite status in invites table
        await updateInviteStatus();
    }

    const updateGroupUserMapping = async (group_id) => {
        try {

            const body = { "groupid": group_id }

            await fetch(process.env.REACT_APP_HOST_URL + "/group/group-user-map", {
                method: "PUT",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            })

        } catch (err) {
            console.error(err.message);
        }
    }

    const updateInviteStatus = async () => {
        try {

            await fetch(process.env.REACT_APP_HOST_URL + "/invite/update-inviteStatus", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token, invitetoken: localStorage.invitetoken }
            })

            localStorage.removeItem("invitetoken")

        } catch (err) {
            console.error(err.message);
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const body = { email, password, name };

        try {

            const response = await fetch(process.env.REACT_APP_HOST_URL + "/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                const inviteToken = localStorage.getItem("invitetoken");
                if (inviteToken) {
                    await processInviteToken(inviteToken);
                }
                navigate("/dashboard?owner_type=1");
                toast.success("Register successfully");
            } else {
                toast.error(parseRes.error);
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="container">
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="form-control my-3"
                    value={name}
                    onChange={e => onChange(e)}
                />
                <button className="btn btn-success w-100">Register</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Register