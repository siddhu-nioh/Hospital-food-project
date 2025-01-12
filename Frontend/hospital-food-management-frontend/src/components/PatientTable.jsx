import React, { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../api/api";

const PatientTable = ({ onEditPatient }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getPatients();
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await deletePatient(id);
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== id)
        );
      } catch (err) {
        console.error("Error deleting patient:", err);
      }
    }
  };

  return (
    <div className="">
      <table className="table-pantry  w-sm font-sans  border-none overflow-y-auto max-h-40 shadow-lg ">
        <thead>
          <tr>
          <th className="border px-4 py-2">S.no</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Room</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Floor Number</th>
            <th className="border px-4 py-2">Emergency Contact</th>
            <th className="border px-4 py-2">Diseases</th>
            <th className="border px-4 py-2">Allergies</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient,index) => (
            <tr key={patient._id}>
               <td className=" px-4 py-2">{index+1}</td>
              <td className=" px-4 py-2">{patient.name}</td>
              <td className=" px-4 py-2">{patient.roomNumber}</td>
              <td className=" px-4 py-2">{patient.floorNumber}</td>
              <td className=" px-4 py-2">{patient.contactInfo}</td>
              <td className=" px-4 py-2">{patient.emergencyContact}</td>
              <td className=" px-4 py-2">{patient.allergies}</td>
              <td className=" px-4 py-2">{patient.diseases}</td>
             
              
              <td className=" px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => onEditPatient(patient)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                  onClick={() => handleDelete(patient._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
