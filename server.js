require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

console.log("SERVER.JS IS RUNNING");

connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// test route
app.get("/", (req, res) => {
  res.send("API working");
});

// auth test
app.get("/api/auth/test", (req, res) => {
  res.send("DIRECT AUTH TEST WORKING");
});

// auth routes
const authRoutes = require("./auth");
app.use("/api/auth", authRoutes);

// 🔥 ADD THIS (Suggestion / Designs routes)
const suggestionRoutes = require("./suggestions");
app.use("/api/designs", suggestionRoutes);

//this will save the project
const designProjectRoutes = require("./designProjects");
app.use("/api/design-projects", designProjectRoutes);

// 🔥 Community Designs Routes
const communityRoutes = require("./communityRoutes");
app.use("/api/community", communityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
