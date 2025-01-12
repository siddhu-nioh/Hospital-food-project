import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import HospitalManagerDashboard from "./pages/HospitalManager/Dashboard";
import InnerPantryDashboard from "./pages/InnerPantry/Dashboard";
import DeliveryPersonnelDashboard from "./pages/DeliveryPersonnel/Dashboard";
import DietChartManager from "./components/DietChartManager";
import DeliveryManager from "./components/DeliveryManager";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      
  <Route path="/" element={<LoginForm />} />
  <Route
    path="/hospital-manager"
    element={
      <ProtectedRoute>
        <HospitalManagerDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/inner-pantry"
    element={
      <ProtectedRoute>
        <InnerPantryDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/delivery-personnel"
    element={
      <ProtectedRoute>
        <DeliveryPersonnelDashboard />
      </ProtectedRoute>
    }
  />

        <Route path="/diet-charts" element={<DietChartManager />} />
        <Route path="/deliveries" element={<DeliveryManager />} />
      </Routes>
    </Router>
  );
}

export default App;
