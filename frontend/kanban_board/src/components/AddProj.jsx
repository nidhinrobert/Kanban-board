import React, { useState } from 'react';
import './Add.css'; 
import { useDispatch } from 'react-redux';
import { addProject, getProjects } from '../redux/projectSlice';


const AddProj = ({ toggleModal }) => {
    const dispatch = useDispatch();
    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const createProject = async (event) => {
        event.preventDefault();
        const newProject = {
            heading,
            description,
            dueDate
        };
        try {
            await dispatch(addProject(newProject)); 
            dispatch(getProjects())
            toggleModal()
        } catch (error) {
            console.error("Failed to add", error);
        }
    };

    return (
        <div id="add-task-modal" className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={toggleModal}> x</span>
                <h2>Add Project</h2>
                <form id="add-task-form" onSubmit={createProject}>
                    <input
                        type="text"
                        id="task-title"
                        placeholder="Task Title"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        required
                    />
                    <textarea
                        id="task-description"
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    Due Date:
                    <input
                        type="date"
                        id="due-date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <button type="submit">Add Task</button> 
                </form>
            </div>
        </div>
    );
};

export default AddProj;
