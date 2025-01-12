const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const dietChartRoutes = require("./routes/dietChartRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const deliveryPersonnelRoutes=require("./routes/deliveryPersonnel")

const pantryRoutes = require("./routes/pantryRoutes");
require("dotenv").config();

const app = express(); // Initialize Express app
const server = http.createServer(app); // Create HTTP server for both Express and Socket.IO

// Initialize Socket.IO
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/diet-charts", dietChartRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/pantry", pantryRoutes);
app.use("/api/delivery-personnel",deliveryPersonnelRoutes);
// Socket.IO Events
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Example: Emit updates for diet charts
app.post("/api/diet-charts", async (req, res) => {
  const dietChart = await DietChart.create(req.body);
  io.emit("dietChartUpdated", dietChart); // Emit event to all connected clients
  res.json(dietChart);
});

// Connect to Database and Start Server
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
