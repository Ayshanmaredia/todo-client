import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./components/FontAwesomeIcons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Invite from "./components/invite/Invite";

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {

      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  })

  return (
    <>
      <Router>
        <div>
          <Routes>
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
              element={isAuthenticated
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
