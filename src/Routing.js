import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Outline from "./components/Outline";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Members from "./components/Members";
import PrivateRoute from "./components/helpers/PrivateRoute";
import SignOut from "./components/SignOut";
import UnAuthorized from "./components/UnAuthorized";
import Missing from "./components/Missing";
import ManageTasks from "./components/ManageTasks";

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
          <Route element={<PrivateRoute allowedRoles={["student","admin"]} />}>
            <Route path="/members" element={<Members />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["admin","student","intern","apprentice","employee"]} />}>
            <Route path="/manage-tasks" element={<ManageTasks />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
