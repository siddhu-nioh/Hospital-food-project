import { io } from "socket.io-client";

const socket = io("https://hospital-food-project-backend.onrender.com"); // Replace with your backend URL

export default socket;
