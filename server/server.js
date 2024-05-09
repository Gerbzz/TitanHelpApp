/** @format */

const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
require("dotenv").config();
require("colors");
const ticketsRouter = require("./routes/tickets");
const app = express();

// Connect Database
connectDB();

// Use cors middleware
app.use(cors());

// Use json middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/tickets", ticketsRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
	console.log(`Server started on port ${PORT}`.green.inverse)
);
