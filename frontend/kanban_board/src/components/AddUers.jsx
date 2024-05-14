import React, { useState } from 'react'
import { addUser, getUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const AddUers = ({ toggleModal,projectId }) => {


    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
   
    const createUser = async (event) => {
        event.preventDefault();
        const newUser = {
            name,email,projectId
        };
        try {
            await dispatch(addUser(newUser)); 
            dispatch(getUser(projectId))
            toggleModal()
        } catch (error) {
            console.error("Failed to add", error);
        }
    };

  return (
    <div id="add-task-modal" className="modal">
    <div className="modal-content">
        <span className="close-button" onClick={toggleModal}> x</span>
        <h2>Add User</h2>
        <form id="add-task-form" onSubmit={createUser}>
            <input
                type="text"
                id="task-title"
                placeholder="Name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
               <input className='email'
                type="email"
                id="task-title"
                placeholder="Email Here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            
           
            <button type="submit">Add User</button> 
        </form>
    </div>
</div>
  )
}

export default AddUers