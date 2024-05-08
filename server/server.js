/** @format */

const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
require("dotenv").config();
require("colors");

const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

const ticketsRouter = require("./routes/tickets");
app.use("/api/tickets", ticketsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server started on port ${PORT}`.green.inverse)
);
