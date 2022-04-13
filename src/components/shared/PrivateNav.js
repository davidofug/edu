import React from "react";
import { signOut } from "../helpers/functions";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import PrivateLink from "./PrivateLink";
import logo from "../../assets/images/Ablestate-logo.png";

function PrivateNav() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={logo} width="22" height="22" alt="Ablestate-logo" />
        <span className="font-semibold text-sm tracking-tight text-black dark:text-gray-100">Ablestate</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/dashboard"
            className="block mt-4 dark:text-gray-100 lg:inline-block lg:mt-0 text-black hover:text-orange-400 mr-4"
          >
            Dashboard
          </Link>
          <Link
            to="/second-cohort-fullstack-outline"
            className="block mt-4 dark:text-gray-100 lg:inline-block lg:mt-0 text-black hover:text-orange-400 mr-4"
          >
            Season 2 Outline
          </Link>
          {user?.user_metadata?.roles &&
            user.user_metadata?.roles.includes("admin") && (
              <Link
                to="/members"
                className="block mt-4 dark:text-gray-100 lg:inline-block lg:mt-0 text-black hover:text-orange-400 mr-4"
                >
                Members
              </Link>
            )}
          <PrivateLink
            className="block mt-4 dark:text-gray-100 lg:inline-block lg:mt-0 text-black hover:text-orange-400 mr-4"
            to="/manage-tasks"
            allowedRoles={[
              "admin",
              "student",
              "employee",
              "intern",
              "apprentice",
            ]}
          >
            Manage Tasks
          </PrivateLink>
        </div>
        <div>
          <Link
            to="#"
            className="px-4 py-1 transition bg-white dark:bg-black dark:border-white dark:text-light-gray hover:-translate-y-1 hover:bg-orange-100 duration-300 mx-auto max-w-md rounded-full border border-orange-500 dark:hover:text-orange-400 dark:hover:bg-black dark:hover:border-orange-400"
            onClick={() => {
              signOut(setUser);
              navigate("/", { replace: true });
            }}
          >
            Sign out
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default PrivateNav;
