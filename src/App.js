import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./components/FontAwesomeIcons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/Dashboard";
import Invite from "./components/invite/Invite";

toast.configure();

function App() {

  async function isAuth() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(process.env.REACT_APP_HOST_URL + "/auth/is-verify", {
          method: "GET",
          headers: { token: localStorage.token }
        });

        if (response.status === 200) {
          const parseRes = await response.json();

          return parseRes === true ? true : false;

        } else {
          return false
        }

      } catch (err) {
        console.error(err.message);
        return false;
      }
    }
    return false;
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
              element={<Login isAuth={isAuth} />}
            />
            <Route
              exact
              path="/register"
              element={<Register isAuth={isAuth} />}
            />
            <Route
              exact
              path="/dashboard"
              element={<Dashboard isAuth={isAuth} />}
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
