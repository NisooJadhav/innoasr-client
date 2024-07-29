import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

import { GoDatabase, GoTable, GoDownload } from "react-icons/go";
import { TiTickOutline } from "react-icons/ti";
import { RxReset } from "react-icons/rx";

const HamburgerMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const mails = [
    "aamirm@innoasr.com",
    "adeshg@innoasr.com",
    "aditish@innoasr.com",
    "adityap@innoasr.com",
    "aishva@innoasr.com",
    "aniketc@innoasr.com",
    "anujb@innoasr.com",
    "apurvat@innoasr.com",
    "bhushans@innoasr.com",
    "bhoomijsh@innoasr.com",
    "chinmayt@innoasr.com",
    "coding-robot@toloka.ai",
    "dishan@innoasr.com",
    "husainc@innoasr.com",
    "imrans@innoasr.com",
    "jalbajip@innoasr.com",
    "jayeshb@innoasr.com",
    "jayeshd@innoasr.com",
    "jyotiv@innoasr.com",
    "kalyanid@innoasr.com",
    "kartikd@innoasr.com",
    "kavyag@innoasr.com",
    "kunalb@innoasr.com",
    "maxbur@toloka.ai",
    "mrunalk@innoasr.com",
    "neerajp@innoasr.com",
    "nikhilr@innoasr.com",
    "nikhils@innoasr.com",
    "nitiny@innoasr.com",
    "pramodd@innoasr.com",
    "prasadg@innoasr.com",
    "pratiks@innoasr.com",
    "rahuls@innoasr.com",
    "rajs@innoasr.com",
    "rohitp@innoasr.com",
    "rohank@innoasr.com",
    "ruchirc@innoasr.com",
    "rutvikpatil@innoasr.com",
    "sakshin@innoasr.com",
    "sangramr@innoasr.com",
    "saritan@innoasr.com",
    "sasea@innoasr.com",
    "sejalc@innoasr.com",
    "shivjad@innoasr.com",
    "shivrajjo@innoasr.com",
    "shreyab@innoasr.com",
    "shubhamb@innoasr.com",
    "shubhamc@innoasr.com",
    "sujatam@innoasr.com",
    "titikshas@innoasr.com",
    "vaishnavi@innoasr.com",
    "vinaym@innoasr.com",
    "vinodt@innoasr.com",
    "vishald@innoasr.com",
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-10">
      {/* Hamburger button */}
      <button
        className="p-2 focus:outline-none hover:scale-110 transition transition-all ease-in-out delay-100"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menu */}
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-55 h-[83vh] bg-white rounded-md shadow-lg py-1"
          data-aos={isOpen ? "fade-right" : "fade-left"}
        >
          {user && user.role === "admin" ? (
            <>
              <NavLink
                to="/all"
                className={`block px-5 py-2 mt-3 text-sm text-gray-700 hover:bg-gray-50 ${
                  location.pathname === "/all" ? "bg-red-100" : ""
                }`}
              >
                <div className="flex align-items items-center text-lg">
                  <GoDatabase className="mr-2" /> All Data
                </div>
              </NavLink>
              <NavLink
                to="/table"
                className={`block px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 ${
                  location.pathname === "/table" ? "bg-red-100" : ""
                }`}
              >
                <div className="flex align-items items-center text-lg">
                  <GoTable className="mr-2" /> Table
                </div>
              </NavLink>
              <NavLink
                to="/reports"
                className={`block px-5 py-2 mb-5 text-sm text-gray-700 hover:bg-gray-50 ${
                  location.pathname === "/reports" ? "bg-red-100" : ""
                }`}
              >
                <div className="flex align-items items-center text-lg">
                  <GoDownload className="mr-2" /> Reports
                </div>
              </NavLink>

              <hr />

              <div
                className={` ${location.pathname === "/" ? "hidden" : "block"}`}
              >
                <h1 className="ml-5 mt-5 mb-5 font-med underline">FILTERS:</h1>

                <label htmlFor="mail" className="ml-5 font-med block">
                  Select Mail:
                </label>
                <select name="mail" id="mail" className="mb-5 w-[10vw] ml-4">
                  <option value="" disabled defaultValue>
                    Select mail
                  </option>
                  {mails.map((mail, index) => (
                    <option key={index} value={mail}>
                      {mail}
                    </option>
                  ))}
                </select>

                <label htmlFor="language" className="ml-5 font-med block">
                  Select Language:
                </label>
                <select
                  name="language"
                  id="language"
                  className="mb-5 block ml-4 w-[10vw]"
                >
                  <option value="C">C</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="Go">Go</option>
                  <option value="SQL">SQL</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                </select>

                <label htmlFor="" className="font-med ml-5 block">
                  Updated At:
                </label>
                <input
                  type="date"
                  name="updatedAt"
                  id=""
                  className="mb-5 block ml-4 cursor-pointer w-[10vw]"
                />

                <label htmlFor="" className="font-med ml-5">
                  Annotations:
                </label>
                <select
                  name="annotations"
                  id="annotations"
                  className="mb-10 block ml-4 w-[10vw]"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>

                <div className="ml-1 flex">
                  <button className="bg-red-600 text-white p-2 pl-4 rounded mr-2 flex items-center align-center">
                    Apply <TiTickOutline />
                  </button>
                  <button className="bg-red-300 text-black p-2 pl-4 pr-4 mr-2 rounded flex items-center align-center">
                    Reset <RxReset />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="px-5 py-2 text-sm text-gray-700">
              Your role: {user ? user.role : "Not logged in"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
