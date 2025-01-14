import { Box, Button, Dialog, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
const CreateOrUpdatePatientModal = ({ patient, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contactInfo: "",
    emergencyContact: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    diseases: "",
    allergies: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "",
        contactInfo: patient.contactInfo || "",
        emergencyContact: patient.emergencyContact || "",
        roomNumber: patient.roomNumber || "",
        bedNumber: patient.bedNumber || "",
        floorNumber: patient.floorNumber || "",
        diseases: patient.diseases?.join(", ") || "",
        allergies: patient.allergies?.join(", ") || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      diseases: formData.diseases.split(",").map((d) => d.trim()),
      allergies: formData.allergies.split(",").map((a) => a.trim()),
    };

    try {
      // Create or update patient based on the presence of `patient` prop
      if (patient) {
        // Update existing patient
        const response = await axios.put(`https://hospital-food-project-backend.onrender.com/api/patients/${patient._id}`, formattedData);
        console.log("Patient updated:", response.data);
      } else {
        // Create new patient
        const response = await axios.post("https://hospital-food-project-backend.onrender.com/api/patients", formattedData);
        console.log("New patient created:", response.data);
      }
       // Call onSubmit callback to refresh the patient list or take other actions
      onClose(); // Close the modal after submit
    } catch (error) {
      console.error("Error saving patient data:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="m" fullWidth>
      <Box
        sx={{
          width: "100%",
          margin: "auto",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          overflowY: "auto", // Ensures the modal doesn't overflow
          maxHeight: "90vh", // Adjust the max height
          "&::-webkit-scrollbar": {
            width: "8px", // Smaller scrollbar width
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Color of the scrollbar thumb
            borderRadius: "4px", // Rounded edges for the scrollbar thumb
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Color of the scrollbar thumb on hover
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Color of the scrollbar track
          },
        }}
      >
        <h2>{patient ? "Update Patient" : "Create Patient"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-wrap gap-4">
          {/* Row 1 */}
          <div className="flex  gap-4 w-full">
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Row 2 */}
          <div className="flex  gap-4 w-full">
            
            <TextField
              label="Contact Info"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Emergency Contact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </div>

          {/* Row 3 */}
         

          {/* Row 4 */}
          <div className="flex  gap-4 w-full">
            <TextField
              label="Bed Number"
              name="bedNumber"
              value={formData.bedNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Floor Number"
              name="floorNumber"
              value={formData.floorNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            
          </div>

          {/* Row 5 */}
          <div className="flex  gap-4 w-full">
          <TextField
              label="Diseases (comma separated)"
              name="diseases"
              value={formData.diseases}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
            />
            <TextField
              label="Allergies (comma separated)"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button onClick={onClose} variant="contained" color="secondary" sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {patient ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Box>
    </Dialog>
  );
};

export default CreateOrUpdatePatientModal;
