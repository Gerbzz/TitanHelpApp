/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import "./TicketList.css";

const TicketList = () => {
	const [tickets, setTickets] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [idToDelete, setIdToDelete] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:5001/api/tickets")
			.then((response) => {
				setTickets(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleDelete = (id) => {
		setShowModal(true);
		setIdToDelete(id);
	};

	const handleDeleteConfirm = (id) => {
		axios
			.delete(`http://localhost:5001/api/tickets/${id}`)
			.then((response) => {
				setTickets(tickets.filter((ticket) => ticket._id !== id));
				setShowModal(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className='container'>
			<h2 className='text-center text-white'>Ticket List</h2>
			{tickets.map((ticket) => (
				<div className='card mb-4' key={ticket._id}>
					<h5 className='card-header'>{ticket.name}</h5>
					<div className='card-body'>
						<p className='card-text'>{ticket.problemDescription}</p>
						<p className='card-text'>{ticket.date}</p>
					</div>
					<div className='card-footer text-right'>
						<button
							className='btn btn-danger'
							onClick={() => handleDelete(ticket._id)}
						>
							Delete
						</button>
					</div>
				</div>
			))}
			{showModal && (
				<DeleteConfirmationModal
					show={showModal}
					onHide={() => setShowModal(false)}
					onConfirm={handleDeleteConfirm}
					id={idToDelete}
				/>
			)}
		</div>
	);
};

export default TicketList;
