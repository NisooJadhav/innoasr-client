import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiLoader2Line } from "react-icons/ri";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Reviewer from "../components/Reviewer";
import Developer from "../components/Developer";

const Project = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [members, setMembers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/userAnnotation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            role: user.role,
          }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMembers(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMembers();
  }, []);

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
      <a
        href="https://notlabel-studio.toloka-test.ai/projects/1033/"
        target="_blank"
      >
        <h1 className="text-center text-2xl sm:text-1xl md:text-2xl lg:text-2.5xl font-med mb-8">
          Project P: Coding evaluation
        </h1>
      </a>
      <div className="container mx-auto px-4 py-8 w-[80vw] ml-[10vw] mb-0">
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
        if (user.role === "Reviewer") {
          return (
            <div className="mt-8 w-[80vw] ml-[10vw]" data-aos="fade-up">
              <h2 className="text-xl font-semibold mb-4">
                {user.email.split("@")[0].charAt(0).toUpperCase() +
                  user.email.split("@")[0].slice(1)}
                's Team Members
              </h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-8">
                  {members.map((m) => (
                    <div className="text-red-700" key={m.USER_EMAIL}>
                      <span className="font-semibold">{m.USER_EMAIL}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Reviewer />
            </div>
          );
        }
        return null;
      })()}

      {(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.role === "Developer") {
          return (
            <div className="mt-8 w-[80vw] ml-[10vw]" data-aos="fade-up">
              <div className="overflow-x-auto"></div>
              <Developer />
            </div>
          );
        }
        return null;
      })()}
    </>
  );
};

export default Project;
