import React from "react";

const DeliveryTaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Delivery Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryTaskList;
