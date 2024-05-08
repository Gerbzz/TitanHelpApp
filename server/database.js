/** @format */

const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB Connected".green.inverse);
	} catch (err) {
		console.error("Error connecting to MongoDB".red, err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
