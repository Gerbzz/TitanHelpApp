/** @format */

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [tickets, setTickets] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		problemDescription: "",
	});

	useEffect(() => {
		fetchTickets();
	}, []);

	const fetchTickets = async () => {
		const result = await axios.get("/api/tickets");
		setTickets(result.data);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("/api/tickets", formData);
			setTickets([...tickets, response.data]);
			setFormData({ name: "", problemDescription: "" }); // Clear form
		} catch (error) {
			console.error("Failed to create ticket:", error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					placeholder='Name'
					required
				/>
				<textarea
					value={formData.problemDescription}
					onChange={(e) =>
						setFormData({ ...formData, problemDescription: e.target.value })
					}
					placeholder='Problem Description'
					required
				/>
				<button type='submit'>Create Ticket</button>
			</form>
			<ul>
				{tickets.map((ticket) => (
					<li key={ticket._id}>
						{ticket.name} - {ticket.problemDescription}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
