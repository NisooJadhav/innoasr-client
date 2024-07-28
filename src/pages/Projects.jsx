import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaCheck } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

const Projects = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(
      "http://localhost:8080/toloka-backend-6mmi.onrender.com/api/projects/"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = data.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RiLoader2Line className="text-red-600 text-6xl animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 w-[80vw] mb-0 z-5 pt-0"
      data-aos="fade-in"
    >
      <center>
        <div
          className="bg-white w-[20vw] flex items-center border border-gray-300 rounded-lg overflow-hidden mb-2"
          data-aos="fade-down"
        >
          <input
            name="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 text-lg bg-transparent focus:outline-none flex-grow"
          />
          <IoIosSearch className="text-gray-400 h-6 w-6 mr-3" />
        </div>
      </center>
      <hr className="mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="bg-white cursor-pointer rounded-lg shadow-sm p-6 drop-shadow-lg flex flex-col justify-between h-[170px] relative"
            onClick={() => navigate(`/projects/${project.id}`)}
            data-aos="flip-left"
            data-aos-duration="1000"
          >
            <div className="absolute top-2 right-2">
              {project.finished_task_number === project.task_number ? (
                <FaCheck className="text-green-600 text-xl" />
              ) : (
                <RiLoader2Line className="text-red-600 text-xl" />
              )}
            </div>
            <h3 className="text-gray-600 text-lg font-med mb-2 line-clamp-3">
              {project.title}
            </h3>
            <p className="text-gray-600 text-lg font-medium mt-auto">
              {project.finished_task_number}/{project.task_number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
