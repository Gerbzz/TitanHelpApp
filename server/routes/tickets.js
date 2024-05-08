/** @format */

const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// POST a new ticket
router.post("/", async (req, res) => {
	const { name, problemDescription } = req.body;
	try {
		const newTicket = new Ticket({
			name,
			problemDescription,
		});

		const savedTicket = await newTicket.save();
		res.json(savedTicket);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// GET all tickets
router.get("/", async (req, res) => {
	try {
		const tickets = await Ticket.find();
		res.json(tickets);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
