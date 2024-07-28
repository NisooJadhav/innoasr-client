import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiLoader2Line } from "react-icons/ri";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Project = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userAnnotations, setUserAnnotations] = useState([]);

  useEffect(() => {
    const fetchUserAnnotations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.email || !user.role) {
          throw new Error("User information not found");
        }

        const response = await fetch(
          "http://localhost:3000/api/userAnnotations",
          {
            credentials: 'include',
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Token +"86b08ad39f4d277161b14cfc94a8a53f1d23f3f8"`,
            },
            // body: JSON.stringify({
            //   email: user.email,
            //   role: user.role,
            // }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserAnnotations(data);
      } catch (error) {
        console.error("Error fetching user annotations:", error);
      }
    };

    fetchUserAnnotations();
  }, []);

  const renderUserTable = (userEmail) => {
    const userTasks = userAnnotations.filter(
      (task) => task.USER_EMAIL === userEmail
    );

    return (
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Task ID</th>
            <th className="py-2 px-4 border-b">Project</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Assigned Date</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.map((task) => (
            <tr key={task.TASK_ID}>
              <td className="py-2 px-4 border-b">{task.TASK_ID}</td>
              <td className="py-2 px-4 border-b">{task.PROJECT}</td>
              <td className="py-2 px-4 border-b">{task.STATUS}</td>
              <td className="py-2 px-4 border-b">
                {new Date(task.ASSIGNED_DATE).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(task.UPDATED_AT).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                <select className="mr-2">
                  <option value="">Select Action</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                  Apply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  renderUserTable();

  // useEffect(() => {
  //   const fetchProjectData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8080/toloka-backend-6mmi.onrender.com/api/projects/${id}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setProject(data[0]);
  //     } catch (error) {
  //       console.error("Error fetching project data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const fetchChartData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/departmentStats");
  //       const data = await response.json();
  //       setChartData(data);
  //     } catch (error) {
  //       console.error("Error fetching chart data:", error);
  //     }
  //   };

  //   fetchProjectData();
  //   fetchChartData();
  // }, [id]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <RiLoader2Line className="text-red-600 text-6xl animate-spin" />
  //     </div>
  //   );
  // }

  // if (!project) {
  //   return <div>Project not found</div>;
  // }

  const stats = [
    {
      label: "Total Annotations",
      // value: project.TOTAL_ANNOTATIONS,
      value: 1500,
      color: "border-blue-600",
      bg: "bg-blue-300",
    },
    {
      label: "First Stage Accepted",
      value: "807",
      color: "border-yellow-600",
      bg: "bg-yellow-300",
    },
    {
      label: "Accepted",
      // value: project.ACCEPTED_COUNT,
      value: 1500,
      color: "border-green-600",
      bg: "bg-green-300",
    },
    {
      label: "Rejected",
      // value: project.REJECTED_COUNT,
      value: 1500,
      color: "border-red-600",
      bg: "bg-red-300",
    },
    {
      label: "Rewrite",
      // value: project.REWRITE_COUNT,
      value: 1500,
      color: "border-purple-600",
      bg: "bg-purple-300",
    },
  ];

  // const languageStats = Object.keys(project)
  //   .filter(
  //     (key) =>
  //       key.endsWith("_COUNT") &&
  //       key !== "TOTAL_ANNOTATIONS" &&
  //       key !== "ACCEPTED_COUNT" &&
  //       key !== "REJECTED_COUNT" &&
  //       key !== "REWRITE_COUNT"
  //   )
  //   .map((key) => {
  //     const language = key.replace("_COUNT", "");
  //     return {
  //       label: language,
  //       value: project[key],
  //       icon: `https://skillicons.dev/icons?i=${language.toLowerCase()}`,
  //     };
  //   });

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: chartData.map((entry) => entry.department),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "   ",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Total",
        data: chartData.map((entry) => entry.total),
        color: "green",
      },
      {
        name: "Closed",
        data: chartData.map((entry) => entry.closed),
        color: "red",
      },
    ],
  };

  return (
    <>
      <h1 className="text-center text-2xl sm:text-1xl md:text-2xl lg:text-2.5xl font-med mb-8">
        Project P: Coding evaluation
      </h1>
      <div className="container mx-auto px-4 py-8 w-[80vw] ml-[15vw] mb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm p-6 border-l-[7px] ${stat.color}`}
              data-aos="zoom-in"
            >
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                {stat.label}
              </h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {languageStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border-l-[7px] border-gray-600"
              data-aos="zoom-in"
            >
              <img
                src={stat.icon}
                alt={stat.label}
                className="w-8 h-8 mb-1 rounded-full border-2 border-white"
              />
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.label}
              </h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div> */}
      </div>
      {/* <div
        className="w-[50vw] ml-[15vw] mt-0"
        data-aos="fade-up"
        data-aos-duration="2500"
      >
        <div className="graph" style={{ paddingTop: "30px" }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div> */}

      {(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.role === "Reviewer") {
          return (
            <div className="mt-8 w-[80vw] ml-[15vw]" data-aos="fade-up">
              <h2 className="text-xl font-semibold mb-4">
                {user.email.split("@")[0].charAt(0).toUpperCase() +
                  user.email.split("@")[0].slice(1)}
                's Team Members
              </h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-8">
                  <div className="text-red-700">
                    <span className="font-semibold">ajay@innoasr.com</span>
                  </div>
                  <div className="text-red-700">
                    <span className="font-semibold">vijay@innoasr.com</span>
                  </div>
                  <div className="text-red-700">
                    <span className="font-semibold">sanjay@innoasr.com</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Task Assignments
                  </h2>
                  <div className="mb-4">
                    <label htmlFor="employeeFilter" className="mr-2">
                      Filter by Employee:
                    </label>
                    <select
                      id="employeeFilter"
                      className="bg-white border border-red-300 rounded px-2 py-1"
                    >
                      <option value="">All Employees</option>
                      <option value="ajay@innoasr.com">ajay@innoasr.com</option>
                      <option value="vijay@innoasr.com">
                        vijay@innoasr.com
                      </option>
                      <option value="sanjay@innoasr.com">
                        sanjay@innoasr.com
                      </option>
                    </select>
                  </div>
                  <table className="w-full bg-red-50 border border-red-200">
                    <thead>
                      <tr className="bg-red-100">
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Task ID
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Assigned To
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Assigned Date
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Updated At
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Status
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Comment
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b border-red-200">
                          <a
                            href="https://notlabel-studio.toloka-test.ai/projects/1033/data?tab=13807&page=1&task=445388"
                            target="_blank"
                          >
                            445387
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          ajay@innoasr.com
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          2023-06-01
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          2023-06-01
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <select className="bg-white border border-red-300 rounded px-2 py-1">
                            <option value="Rewrite">Rewrite</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <textarea
                            className="w-full bg-white border border-red-300 rounded px-2 py-1"
                            rows="3"
                            defaultValue="Working on UI"
                            required
                          ></textarea>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                            Update
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b border-red-200">
                          <a
                            href="https://notlabel-studio.toloka-test.ai/projects/1033/data?tab=13807&page=1&task=445388"
                            target="_blank"
                          >
                            445388
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          vijay@innoasr.com
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          2023-06-02
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          2023-06-02
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <select className="bg-white border border-red-300 rounded px-2 py-1">
                            <option value="Rewrite">Rewrite</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <textarea
                            className="w-full bg-white border border-red-300 rounded px-2 py-1"
                            rows="3"
                            defaultValue="Backend integration done"
                          ></textarea>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                            Update
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b border-red-200">
                          <a
                            href="https://notlabel-studio.toloka-test.ai/projects/1033/data?tab=13807&page=1&task=445389"
                            target="_blank"
                          >
                            445389
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          sanjay@innoasr.com
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          2023-06-03
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          2023-06-03
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <select className="bg-white border border-red-300 rounded px-2 py-1">
                            <option value="Rewrite">Rewrite</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <textarea
                            className="w-full bg-white border border-red-300 rounded px-2 py-1"
                            rows="3"
                            defaultValue="Pending resource allocation"
                          ></textarea>
                        </td>
                        <td className="py-2 px-4 border-b border-red-200">
                          <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                            Update
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          );
        }
        return null;
      })()}

      {(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.role === "Developer") {
          return (
            <div className="mt-8 w-[80vw] ml-[15vw]" data-aos="fade-up">
              <div className="overflow-x-auto">
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Tasks assigned to you,{" "}
                    {user.email.split("@")[0].charAt(0).toUpperCase() +
                      user.email.split("@")[0].slice(1)}
                  </h2>
                  <table className="w-full bg-red-50 border border-red-100">
                    <thead>
                      <tr className="bg-red-100">
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Task ID
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Assigned Date
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Status
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Comment from Reviewer
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Your Comment
                        </th>
                        <th className="py-2 px-4 border-b border-red-200 text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Task rows */}
                      <tr>
                        <td className="py-2 px-4 border-b border-red-100">
                          <a
                            href="https://notlabel-studio.toloka-test.ai/projects/1033/data?tab=13807&page=1&task=445388"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            445387
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b border-red-100">
                          2023-06-01
                        </td>
                        <td className="py-2 px-4 border-b border-red-100">
                          <select className="bg-white border border-red-200 rounded px-2 py-1">
                            <option value="Completed">Completed</option>
                            <option value="Pending" selected>
                              Pending
                            </option>
                          </select>
                        </td>
                        <td className="py-2 px-4 border-b border-red-100">
                          do task properly
                        </td>
                        <td className="py-2 px-4 border-b border-red-100">
                          <textarea
                            className="w-full bg-white border border-red-200 rounded px-2 py-1"
                            rows="3"
                            defaultValue="I'm always right"
                            required
                          ></textarea>
                        </td>
                        <td className="py-2 px-4 border-b border-red-100">
                          <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                            Submit
                          </button>
                        </td>
                      </tr>
                      {/* Repeat similar structure for other rows */}
                    </tbody>
                  </table>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          );
        }
        return null;
      })()}
    </>
  );
};

export default Project;
