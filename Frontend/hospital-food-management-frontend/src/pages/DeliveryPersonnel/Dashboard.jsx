import React from "react";
import DeliveryTaskList from "../../components/DeliveryTaskList";
import PantryStaffList from "../../components/PantryStaffList";
import MealAssignmentTable from "../../components/MealAssignmentTable";
import DeliveryTable from "../../components/DeliveryTable";
import DeliveryPersonnelTable from "../../components/DeliveryPeronneltable";
import LogoutButton from "../../components/LogoutBuuton";
const DeliveryPersonnelDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Delivery Personnel Dashboard</h1>
      <LogoutButton/>
     <DeliveryTable/>
      <DeliveryPersonnelTable/>
    </div>
  );
};

export default DeliveryPersonnelDashboard;
