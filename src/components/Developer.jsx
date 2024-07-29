import React, { useState, useEffect } from "react";

const Developer = () => {
  const [userAnnotations, setUserAnnotations] = useState([]);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const userTasks = userAnnotations.filter(
    (task) => task.USER_EMAIL === user.email
  );

  const handleUpdate = async (task) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const body = {
      role: user.role,
      taskid: task.TASK_ID,
      status: task.newStatus,
      comment: task.newComment || "Invalid",
    };

    try {
      const response = await fetch("http://localhost:3000/api/userAnnotation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);

      // Update the local state to reflect the changes
      const updatedTasks = userAnnotations.map((t) =>
        t.TASK_ID === task.TASK_ID
          ? { ...t, STATUS: task.newStatus, COMMENT: task.newComment }
          : t
      );
      setUserAnnotations(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    const fetchUserAnnotations = async () => {
      try {
        if (!user || !user.email || !user.role) {
          throw new Error("User information not found");
        }
        const response = await fetch(
          `http://localhost:3000/api/userAnnotations?email=${user.email}`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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

    fetchUserAnnotations();
  }, [user]);

  return (
    <div>
      <div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Tasks assigned to you,{" "}
            {user.email.split("@")[0].charAt(0).toUpperCase() +
              user.email.split("@")[0].slice(1)}
          </h2>

          <h3 className="text-lg font-medium mb-8">
            Total Tasks: {userTasks.length}
          </h3>

          <table className="w-full bg-red-50 border border-red-100">
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
              {userAnnotations.map((task, index) => (
                <tr key={index}>
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
                    <select
                      className="bg-white border border-red-300 rounded px-2 py-1"
                      value={task.STATUS}
                      onChange={(e) =>
                        handleUpdate({ ...task, newStatus: e.target.value })
                      }
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="Completed">Completed</option>
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
                      onChange={(e) =>
                        handleUpdate({ ...task, newComment: e.target.value })
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-red-200">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleUpdate(task)}
                    >
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
    </div>
  );
};

export default Developer;