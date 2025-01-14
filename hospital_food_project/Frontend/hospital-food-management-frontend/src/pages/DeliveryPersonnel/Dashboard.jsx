import React from "react";
import DeliveryTaskList from "../../components/DeliveryTaskList";
import PantryStaffList from "../../components/PantryStaffList";
import MealAssignmentTable from "../../components/MealAssignmentTable";
import DeliveryTable from "../../components/DeliveryTable";
import DeliveryPersonnelTable from "../../components/DeliveryPeronneltable";
import LogoutButton from "../../components/LogoutBuuton";
const DeliveryPersonnelDashboard = () => {
  return (
    <div className="p-0">
      <h1 className="text-3xl font-bold mb-6 p-4 text-center bg-black text-white shadow-l hover:shadow-xl focus:shadow-xl shadow-blue-500/50text-3xl font-bold mb-6 p-4 text-center bg-black text-white shadow-l hover:shadow-xl focus:shadow-xl shadow-blue-500/50">Inner Pantry Dashboard</h1>
      <div className="px-6">
      <LogoutButton/>
     <DeliveryTable/>
      <DeliveryPersonnelTable/>
      </div>
    </div>
  );
};

export default DeliveryPersonnelDashboard;
