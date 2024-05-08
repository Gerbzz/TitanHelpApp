/** @format */

const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	problemDescription: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Ticket", TicketSchema);
