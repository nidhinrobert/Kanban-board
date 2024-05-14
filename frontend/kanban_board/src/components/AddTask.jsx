
import React, { useState } from 'react';
import './Add.css'; 
import { useDispatch } from 'react-redux';
import { addTask, getDone, getInProgress, getTodo } from '../redux/taskSlice';

const AddTask = ({ toggleModal,projectId }) => {

const dispatch = useDispatch();
  const [title,setTaskTitle] = useState("");
  const [dueDate,setDueDate] = useState("");
  const [description,setTaskDescription] = useState("");
  const [status,setStatus] = useState("todo");
  
const createTask = async(event)=>{
  event.preventDefault();
    const newTask = {
      title,
      description,
      projectId,
      status,
      dueDate
    }
    
    try{
      await dispatch(addTask(newTask));
      toggleModal();
      dispatch(getTodo(projectId));
      dispatch(getInProgress(projectId));
      dispatch(getDone(projectId));
      

    }catch(error){
      console.error("failed to add",error);
    }
}


  return (
    <div id="add-task-modal" className="modal">
    <div className="modal-content">
      <span className="close-button" onClick={toggleModal}> x</span>
      <h2>Add New Task</h2>
      <form id="add-task-form" onSubmit={createTask} >
        <input
          type="text"
          id="task-title"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <textarea
          id="task-description"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        ></textarea>
        <select id="column-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
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

export default AddTask;
