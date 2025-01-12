import React from "react";

const TaskTable = ({ tasks }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Task</th>
          <th className="border border-gray-300 p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="border border-gray-300 p-2">{task.name}</td>
            <td className="border border-gray-300 p-2">{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
