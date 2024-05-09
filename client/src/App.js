/** @format */

// App.js
import React, { useState, useEffect } from "react";
import TicketForm from "./components/TicketForm/TicketForm"; // Adjust the path according to your structure
import TicketList from "./components/TicketList/TicketList";
import "./App.css";

const App = () => {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5001/api/tickets")
			.then((response) => response.json())
			.then((data) => setTickets(data));
	}, []);

	const handleCreateTicket = async (ticketData) => {
		const response = await fetch("http://localhost:5001/api/tickets", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(ticketData),
		});

		const newTicket = await response.json();
		setTickets([...tickets, newTicket]);
	};

	return (
		<div className='custom-background'>
			<TicketForm onCreateTicket={handleCreateTicket} />
			<TicketList tickets={tickets} />
		</div>
	);
};

export default App;
