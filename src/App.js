import React, { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./components/FontAwesomeIcons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/Dashboard";
import Invite from "./components/invite/Invite";
import { useData } from "./DataContext";

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { getInviteDetails } = useData();

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useLayoutEffect(() => {
    const inviteToken = localStorage.getItem("invitetoken");
    if (inviteToken) {
      processInviteToken().then(() => {
        isAuth();
      })
    } else {
      isAuth();
    }
  }, []);

  async function isAuth() {
    try {

      const response = await fetch(process.env.REACT_APP_HOST_URL + "/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      return parseRes === true ? true : false;

    } catch (err) {
      console.error(err.message);
    }
  }

  async function processInviteToken() {
    const inviteToken = localStorage.getItem("invitetoken");

    if (inviteToken) {
      // 1. Call invite api and get dcrypted token 
      const response = await getInviteDetails(inviteToken);

      const parseRes = await response.json();

      // 2. Update group_user_mapping
      try {

        const body = { "group_id": parseRes.group_id }

        await fetch(process.env.REACT_APP_HOST_URL + "/group/group-user-map", {
          method: "PUT",
          headers: { "Content-Type": "application/json", token: localStorage.token },
          body: JSON.stringify(body)
        })

      } catch (err) {
        console.error(err.message);
      }

      // 3. update invite status in invites table
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

  }

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={!isAuthenticated
                ?
                <Login setAuth={setAuth} />
                :
                <Navigate to="/dashboard" />}
            />
            <Route
              exact
              path="/register"
              element={!isAuthenticated
                ?
                <Register setAuth={setAuth} />
                :
                <Navigate to="/login" />}
            />
            <Route
              exact
              path="/dashboard"
              element={isAuth()
                ?
                <Dashboard setAuth={setAuth} />
                :
                <Navigate to="/login" />}
            />
            <Route
              exact
              path="/invite"
              element={<Invite />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
