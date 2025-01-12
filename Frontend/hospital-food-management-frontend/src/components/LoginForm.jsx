import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // Decode the token to get the role
      const tokenPayload = JSON.parse(atob(res.data.token.split(".")[1]));
      const userRole = tokenPayload.role;

      // Redirect based on user role
      if (userRole === "HospitalManager") navigate("/hospital-manager");
      else if (userRole === "InnerPantry") navigate("/inner-pantry");
      else if (userRole === "DeliveryPersonnel") navigate("/delivery-personnel");
      else alert("Invalid role! Cannot navigate.");

      alert("Login Successful");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page-container">
      {/* Image Section */}
      <div className="login-image-section"></div>

      {/* Form Section */}
      <div className="login-form-section">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
