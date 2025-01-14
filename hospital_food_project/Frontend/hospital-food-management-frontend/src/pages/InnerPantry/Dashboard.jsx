import React, { useState } from "react";
import PantryStaffList from "../../components/PantryStaffList";
import MealAssignmentTable from "../../components/MealAssignmentTable";
import DeliveryPersonnelManagement from "../../components/DeliveryPersonnelManagement";
import DeliveryPersonnelDashboard from "../DeliveryPersonnel/Dashboard";
import DeliveryPersonnelTable from "../../components/DeliveryPeronneltable";
import CompletedMealAssignments from "../../components/CompletedMealAssignments"; // New component for completed meal assignments
import DeliveryTableManger from "../../components/DeliveryTableManger";
import LogoutButton from "../../components/LogoutBuuton";

const InnerPantryDashboard = () => {
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isMealAssignmentModalOpen, setIsMealAssignmentModalOpen] = useState(false); // State for meal assignment modal

  const openDeliveryModal = () => setIsDeliveryModalOpen(true);
  const closeDeliveryModal = () => setIsDeliveryModalOpen(false);

  const openMealAssignmentModal = () => setIsMealAssignmentModalOpen(true); // Open meal assignment modal
  const closeMealAssignmentModal = () => setIsMealAssignmentModalOpen(false); // Close meal assignment modal

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6 p-4 text-center bg-black text-white shadow-l hover:shadow-xl focus:shadow-xl shadow-blue-500/50text-3xl font-bold mb-6 p-4 text-center bg-black text-white shadow-l hover:shadow-xl focus:shadow-xl shadow-blue-500/50">Inner Pantry Dashboard</h1>
      <div className="px-6 flex space-x-8">
      {/* Button to manage delivery personnel */}
      <button
        onClick={openDeliveryModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Manage Delivery Personnel
      </button>

      {/* Button to manage completed meal assignments */}
      <button
        onClick={openMealAssignmentModal}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-4"
      >
        Assign Completed Meal to Delivery
      </button>
      
      <LogoutButton/>
      </div>
      <div className="px-6  flex wrap space-x-6 mt-4"> <DeliveryTableManger/>
      <div className="px-6 mt-40 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Pantry Staff List</h1>
      <PantryStaffList />
      </div>

      </div>
     
      {/* Pantry Staff List */}
      
      <div className="px-6 mt-3">

      <h1 className="text-2xl font-bold mb-4">DeliveryPersonnel list</h1>
      {/* Delivery Personnel Table */}
      <DeliveryPersonnelTable />
</div>
      {/* Meal Assignment Table */}
      <div className="px-6 mt-3">
      <h1 className="text-2xl font-bold mb-4">Meal Assignments</h1>
      <MealAssignmentTable />
      </div>
      {/* Modal for Delivery Personnel Management */}
      {isDeliveryModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 relative">
            <button
              onClick={closeDeliveryModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Delivery Personnel Management</h2>
            <DeliveryPersonnelManagement />
          </div>
        </div>
      )}

      {/* Modal for Assigning Completed Meal to Delivery Personnel */}
      {isMealAssignmentModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 relative">
            <button
              onClick={closeMealAssignmentModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Assign Completed Meal to Delivery Personnel</h2>

            {/* Completed Meal Assignments Component */}
            <CompletedMealAssignments />

            {/* Optionally, add functionality for assigning completed meal to delivery */}
          </div>
        </div>
      )}
    </div>
  );
};

export default InnerPantryDashboard;
