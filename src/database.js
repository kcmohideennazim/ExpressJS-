const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Event listeners for connection issues
mongoose.connection.on("disconnected", () => {
  console.warn(" MongoDB Disconnected!");
});
mongoose.connection.on("error", (err) => {
  console.error(" MongoDB Error:", err.message);
});

module.exports = connectDB;

