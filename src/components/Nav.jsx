import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("user");
    // setUser(null);
    // window.location.reload();
    onLogout();
    navigate("/login");
  };

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  return (
    <nav className="bg-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              <NavLink to="/">
                <img className="h-10 w-auto" src="/innoasr.jpg" alt="Logo" />
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavLink
                  to="/"
                  className="text-red-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </NavLink>
                <NavLink
                  to="#"
                  className="text-red-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Careers
                </NavLink>
                <NavLink
                  to="#"
                  className="text-red-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </NavLink>

                <div className="flex-grow"></div>
                {user && (
                  <div className="flex items-center ml-auto">
                    <span className="text-white mr-4">
                      Hi, {user.role} {user.email.split("@")[0]}
                    </span>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md text-sm font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-red-500 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className="text-gray-300 hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="#"
              className="text-gray-300 hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Careers
            </NavLink>
            <NavLink
              to="#"
              className="text-gray-300 hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </NavLink>
            {user && (
              <>
                <div className="text-white top-0 right-0 mt-2 mr-2">
                  <span className="mr-4">
                    Hi, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}{" "}
                    {user.email.split("@")[0].charAt(0).toUpperCase() +
                      user.email.split("@")[0].slice(1)}
                  </span>
                  <button
                    className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded-md text-sm font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
                <button
                  className="w-full text-left text-white bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md text-base font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
