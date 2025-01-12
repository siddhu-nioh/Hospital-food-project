const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  const users = {
    "hospital_manager@xyz.com": "HospitalManager",
    "hospital_pantry@xyz.com": "InnerPantry",
    "hospital_delivery@xyz.com": "DeliveryPersonnel",
  };

  if (users[email] && password === "Password@2025") {
    const token = jwt.sign({ role: users[email] }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
};
