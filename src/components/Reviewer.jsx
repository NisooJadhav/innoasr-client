import React, { useEffect, useState } from "react";

const Reviewer = () => {
  const [userAnnotations, setUserAnnotations] = useState([]);
  const [members, setMembers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const userTasks = userAnnotations.filter(
    (task) => task.USER_EMAIL === user.email
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchUserAnnotations = async () => {
      try {
        if (!user || !user.email || !user.role) {
          throw new Error("User information not found");
        }
        const response = await fetch(
          "http://localhost:3000/api/reviewer?email=" + user.email,
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Token +"86b08ad39f4d277161b14cfc94a8a53f1d23f3f8"`,
            },
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
    fetchUserAnnotations();
  }, []);

  return (
    <div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Task Assignments</h2>
        <h3 className="text-lg font-medium mb-8">
          Total Tasks: {userAnnotations.length}
        </h3>
        <div className="mb-4">
          <label htmlFor="employeeFilter" className="mr-2">
            Filter by Employee:
          </label>

          <select
            id="employeeFilter"
            className="bg-white border border-red-300 rounded px-2 py-1"
          >
            {members.map((member) => (
              <option key={member.USER_EMAIL} value={member.USER_EMAIL}>
                {member.USER_EMAIL}
              </option>
            ))}
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
                Status
              </th>
              <th className="py-2 px-4 border-b border-red-200 text-left">
                Assigned Date
              </th>
              <th className="py-2 px-4 border-b border-red-200 text-left">
                Comment from Developer
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
            {userAnnotations.map((task) => (
              <tr>
                <td className="py-2 px-4 border-b border-red-200">
                  <a
                    href={`https://notlabel-studio.toloka-test.ai/projects/${task.PROJECT}/data?tab=13807&page=1&task=${task.TASK_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {task.TASK_ID}
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  {task.USER_EMAIL}
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  <select className="bg-white border border-red-300 rounded px-2 py-1">
                    <option
                      value="Not Started"
                      selected={task.STATUS === "Not Started"}
                    >
                      Not Started
                    </option>
                    <option
                      value="In Progress"
                      selected={task.STATUS === "In Progress"}
                    >
                      In Progress
                    </option>
                    <option
                      value="Completed"
                      selected={task.STATUS === "Completed"}
                    >
                      Completed
                    </option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  {new Date(task.ASSIGNED_DATE).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  <textarea
                    className="w-full bg-white border border-red-300 rounded px-2 py-1"
                    rows="3"
                    defaultValue={task.COMMENT || ""}
                    disabled
                  />
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  <textarea
                    className="w-full bg-white border border-red-300 rounded px-2 py-1"
                    rows="3"
                    defaultValue=""
                  />
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {userTasks.map((task) => (
              <tr>
                <td className="py-2 px-4 border-b border-red-200">
                  <a
                    href={`https://notlabel-studio.toloka-test.ai/projects/${task.PROJECT}/data?tab=13807&page=1&task=${task.TASK_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {task.TASK_ID}
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  {task.USER_EMAIL}
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  {task.PROJECT}
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  <select className="bg-white border border-red-300 rounded px-2 py-1">
                    <option
                      value="Not Started"
                      selected={task.STATUS === "Not Started"}
                    >
                      Not Started
                    </option>
                    <option
                      value="In Progress"
                      selected={task.STATUS === "In Progress"}
                    >
                      In Progress
                    </option>
                    <option
                      value="Completed"
                      selected={task.STATUS === "Completed"}
                    >
                      Completed
                    </option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  {new Date(task.ASSIGNED_DATE).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  <textarea
                    className="w-full bg-white border border-red-300 rounded px-2 py-1"
                    rows="3"
                    defaultValue={task.COMMENT || ""}
                    placeholder="your comment here"
                  ></textarea>
                </td>
                <td className="py-2 px-4 border-b border-red-200">
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Reviewer;
