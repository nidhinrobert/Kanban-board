import React from 'react'

const DeleteModal = ({ onCancel, onConfirm }) => {
    
  return (
    <div className="modal">
    <div className="modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this task?</p>
      <div className="buttons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);
};

export default DeleteModal