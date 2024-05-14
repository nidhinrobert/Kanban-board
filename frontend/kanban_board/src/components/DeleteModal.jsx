import React from 'react'

const DeleteModal = ({ onCancel, onConfirm }) => {
    
  return (
    <div className="modal">
    <div className="modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this task?</p>
      <div className="buttons">
        <div className='btncont'>
        <button  className='btna' onClick={onCancel}>Cancel</button>
        <button className='btna' onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  </div>
);
};

export default DeleteModal