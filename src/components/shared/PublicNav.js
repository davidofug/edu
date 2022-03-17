import React from "react";
import { Link } from "react-router-dom";
import  logo  from "../../assets/images/Ablestate-logo.png";
function PublicNav() {
  return (
    <nav className="flex items-center justify-between flex-wrap p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={logo} width="22" height="22" alt="Ablestate-logo" />
        <span className="font-semibold text-sm tracking-tight text-black">Ablestate</span>
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
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-orange-400 mr-4"
          >
            Home
          </Link>
          <Link
            to="/second-cohort-fullstack-outline"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-orange-400 mr-4"
          >
            Season 2
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default PublicNav;
