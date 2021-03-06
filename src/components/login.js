import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ isAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const navigate = useNavigate();

    useEffect(() => {
        const checkIsAuth = async () => {
            const isAutheticated = await isAuth();
            if (isAutheticated) {
                navigate('/dashboard?owner_type=1');
            }
        }
        checkIsAuth();
    }, [])


    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { email, password };

            const response = await fetch(process.env.REACT_APP_HOST_URL + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                navigate(`/dashboard?owner_type=1`)
                toast.success("Login successfully");
            } else {
                toast.error(parseRes.error);
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="container">
            <h1 className="text-center my-5">Login</h1>
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
                <button className="btn btn-success w-100">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default Login;