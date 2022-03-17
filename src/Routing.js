import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Outline from "./components/Outline";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddUser from "./components/AddUser";
import PrivateRoute from "./components/helpers/PrivateRoute";
import SignOut from "./components/SignOut";
import UnAuthorized from "./components/UnAuthorized";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route
            path="/second-cohort-fullstack-outline"
            element={<Outline id="fullstack-cohort-2" />}
          />
          <Route path="/unathorized" element={<UnAuthorized />} />
          <Route element={<PrivateRoute allowedRoles={["student","admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/add-user" element={<AddUser />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
