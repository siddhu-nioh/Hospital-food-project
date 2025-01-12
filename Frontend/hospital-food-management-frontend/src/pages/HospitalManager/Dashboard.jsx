import React, { useState } from "react";
import PatientTable from "../../components/PatientTable";
import DietChartTable from "../../components/DietChartTable";
import CreateOrUpdatePatientModal from "../../components/CreateOrUpdatePatientModal";
import DietChartManager from "../../components/DietChartManager";
import PantryStaffModal from "../../components/PantryStaffModal";
import MealAssignmentForm from "../../components/MealAssignmentForm"; 
import PantryStaffList from "../../components/PantryStaffList";
import MealAssignmentTable from "../../components/MealAssignmentTable"; 
import LogoutButton from "../../components/LogoutBuuton"; // Fixed typo in LogoutButton import
import DeliveryTableManager from "../../components/DeliveryTableManger";

const HospitalManagerDashboard = () => {
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isDietChartModalOpen, setIsDietChartModalOpen] = useState(false);
  const [isPantryStaffModalOpen, setIsPantryStaffModalOpen] = useState(false);
  const [isMealAssignmentModalOpen, setIsMealAssignmentModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const openPatientModal = (patient = null) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

  const closePatientModal = () => {
    setIsPatientModalOpen(false);
    setSelectedPatient(null);
  };

  const openDietChartModal = () => {
    setIsDietChartModalOpen(true);
  };

  const closeDietChartModal = () => {
    setIsDietChartModalOpen(false);
  };

  const openPantryStaffModal = () => {
    setIsPantryStaffModalOpen(true);
  };

  const closePantryStaffModal = () => {
    setIsPantryStaffModalOpen(false);
  };

  const openMealAssignmentModal = () => {
    setIsMealAssignmentModalOpen(true);
  };

  const closeMealAssignmentModal = () => {
    setIsMealAssignmentModalOpen(false);
  };

  return (
    <div className="  max-h-screen">
      <h1 className="text-3xl font-bold mb-6 p-4 text-center bg-black text-white shadow-l hover:shadow-xl focus:shadow-xl shadow-blue-500/50">Hospital Manager Dashboard</h1>

      <div className="flex flex-wrap justify-center mb-6 space-x-36">
        {/* Create Patient Button */}
        <button
          onClick={() => openPatientModal()}
          className="bg-green-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 mx-2 shadow-l hover:shadow-xl" 
        >
          Create Patient
        </button>

        {/* Create Diet Chart Button */}
        <button
          onClick={openDietChartModal}
          className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mx-2 shadow-l hover:shadow-xl"
        >
          Create Diet Chart
        </button>

        {/* Add Pantry Staff Button */}
        <button
          onClick={openPantryStaffModal}
          className="bg-yellow-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 mx-2 shadow-l hover:shadow-xl"
        >
          Add Pantry Staff
        </button>

        {/* Assign Meal Button */}
        <button
          onClick={openMealAssignmentModal}
          className="bg-purple-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 mx-2 shadow-l hover:shadow-xl"
        >
          Assign Meal
        </button>
        <LogoutButton />
      </div>

      <div className="bg-white p-6 flex space-x-8   ">
      <DeliveryTableManager />
      <div className="bg-white  mt-28 p-8">
          <h2 className="text-3xl font-semibold mb-4">Pantry Staff</h2>
          <PantryStaffList />
        </div>
      </div>
      <div className="bg-white  rounded-lg">
          <h2 className="text-3xl px-6 font-semibold mb-4">Diet Charts</h2>
          <DietChartTable onEdit={openDietChartModal} />
        </div>
        <div className="bg-white p-6  ">
          <h2 className="text-3xl  font-semibold mb-4">Patients</h2>
          <PatientTable onEditPatient={openPatientModal} />
        </div>
      {/* Tables Section */}
      <div className="bg-white p-6 ">
          <h2 className="text-3xl font-semibold mb-4">Meal Assignments</h2>
          <MealAssignmentTable />
        </div>

      {/* Delivery Table Manager */}
      

      {/* Modals */}
      {isPatientModalOpen && (
        <CreateOrUpdatePatientModal
          patient={selectedPatient}
          onClose={closePatientModal}
        />
      )}

      {isDietChartModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={closeDietChartModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Create Diet Chart</h2>
            <DietChartManager />
            <div className="mt-4 text-right">
              <button
                onClick={closeDietChartModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isPantryStaffModalOpen && (
        <PantryStaffModal onClose={closePantryStaffModal} />
      )}

      {isMealAssignmentModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={closeMealAssignmentModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Assign Meal</h2>
            <MealAssignmentForm />
            <div className="mt-4 text-right">
              <button
                onClick={closeMealAssignmentModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalManagerDashboard;
