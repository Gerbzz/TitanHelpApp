/** @format */

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const TicketForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		date: "",
		problemDescription: "",
	});
	const [submissionMessage, setSubmissionMessage] = useState("");
	const [countdown, setCountdown] = useState(5); // Add a countdown state

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:5001/api/tickets",
				formData
			);

			if (response.status === 201) {
				setSubmissionMessage("Ticket has been successfully created!");
				setFormData({ name: "", date: "", problemDescription: "" }); // Clear form on success
				setTimeout(() => {
					setSubmissionMessage("");
					window.location.reload(); // Refresh the page
				}, 5000); // Refresh the page after 5 seconds

				// Start the countdown
				const intervalId = setInterval(() => {
					setCountdown((prevCountdown) => prevCountdown - 1);
				}, 1000);

				// Clear the countdown after 5 seconds
				setTimeout(() => {
					clearInterval(intervalId);
				}, 5000);
			} else {
				throw new Error("Failed to create the ticket");
			}
		} catch (error) {
			setSubmissionMessage(
				error.response?.data?.message || error.message || "Something went wrong"
			);
		}
	};

	return (
		<div className='container my-5 pt-5'>
			<h1 className='text-center mb-4'>Titan Help App</h1>
			<div className='card shadow-lg p-3 mb-5 bg-white rounded'>
				<div className='card-body'>
					<h1 className='text-center mb-4'>Create Ticket</h1>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<input
								type='text'
								className='form-control'
								name='name'
								placeholder='Name'
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div className='mb-3'>
							<input
								type='date'
								className='form-control'
								name='date'
								value={formData.date}
								onChange={handleChange}
							/>
						</div>
						<div className='mb-3'>
							<textarea
								className='form-control'
								rows='3'
								name='problemDescription'
								placeholder='Problem Description'
								value={formData.problemDescription}
								onChange={handleChange}
							></textarea>
						</div>
						<button type='submit' className='btn btn-primary w-100'>
							Create Ticket
						</button>
						{submissionMessage && (
							<div className='alert alert-success mt-3'>
								{submissionMessage}
								{countdown > 0 && (
									<span> (Page will refresh in {countdown} seconds)</span>
								)}
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default TicketForm;
