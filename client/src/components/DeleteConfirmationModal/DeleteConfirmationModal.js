/** @format */

// components/DeleteConfirmationModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = ({ show, onHide, onConfirm, id }) => {
	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header>Delete Confirmation</Modal.Header>
			<Modal.Body>Are you sure you want to delete this ticket?</Modal.Body>
			<Modal.Footer>
				<Button variant='danger' onClick={() => onConfirm(id)}>
					yes, Delete
				</Button>
				<Button variant='secondary' onClick={onHide}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteConfirmationModal;
