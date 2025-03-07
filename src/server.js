const express = require("express");
const connectDB = require("./database");
const userRoutes = require("./routes/user");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// User Routes
app.use("/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
