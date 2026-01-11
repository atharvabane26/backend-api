require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const suggestionRoutes = require("./routes/suggestion");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use("/api/suggestions", suggestionRoutes);



const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
