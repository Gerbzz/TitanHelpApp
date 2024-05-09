/** @format */

// server/routes/tickets.js
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// GET all tickets
router.get("/", async (req, res) => {
	try {
		const tickets = await Ticket.find();
		res.json(tickets);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// POST a new ticket
router.post("/", async (req, res) => {
	const { name, problemDescription } = req.body;
	if (!name || !problemDescription) {
		return res
			.status(400)
			.json({ message: "Name and problem description are required." });
	}
	try {
		const newTicket = new Ticket({
			name,
			problemDescription,
		});

		const savedTicket = await newTicket.save();
		if (savedTicket) {
			res
				.status(201)
				.json({ message: "Ticket created successfully", ticket: savedTicket });
		} else {
			res.status(400).json({ message: "Failed to create a ticket." });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// DELETE a ticket by ID
router.delete("/:id", async (req, res) => {
	try {
		const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

		if (deletedTicket) {
			res.json({ message: "Ticket deleted successfully" });
		} else {
			res.status(404).json({ message: "Ticket not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
