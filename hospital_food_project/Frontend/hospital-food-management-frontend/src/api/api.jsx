import axios from "axios";

const API_BASE_URL = "https://hospital-food-project-backend.onrender.com/api"; // Update this with your backend URL.

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Patients
export const getPatients = () => api.get("/patients");
export const createPatient = (data) => api.post("/patients", data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);
export const deletePatient = (id) => api.delete(`/patients/${id}`);

// Diet Charts
export const getDietCharts = () => api.get("/diet-charts");
export const createDietChart = (data) => api.post("/diet-charts", data);
export const updateDietChart = (id, data) => api.put(`/diet-charts/${id}`, data);
export const deleteDietChart = (id) => api.delete(`/diet-charts/${id}`);

// Deliveries
export const getDeliveries = () => api.get("/deliveries");
export const createDelivery = (data) => api.post("/deliveries", data);
export const updateDeliveryStatus = (id, data) => api.put(`/deliveries/${id}`, data);
export const deleteDelivery = (id) => api.delete(`/deliveries/${id}`);

// export const getPatients = () => axios.get(`${API_BASE_URL}/api/patients`);
// export const createPatient = (patient) => axios.post(`${API_BASE_URL}/api/patients`, patient);
// export const updatePatient = (id, patient) => axios.put(`${API_BASE_URL}/api/patients/${id}`, patient);
// export const deletePatient = (id) => axios.delete(`${API_BASE_URL}/api/patients/${id}`);