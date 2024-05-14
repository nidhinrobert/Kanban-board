import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, getDone, getInProgress, getProgressbyId, getTodo } from '../redux/taskSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Update = ({ toggleEditModal, taskId, task: initialTask }) => {
    const dispatch = useDispatch();
    const taskFromStore = useSelector((state) => state.progress.items.taskItems.find((item) => item._id === taskId));
    const taskProgressFromStore = useSelector((state) => state.progress.inProgress.taskItems.find((item) => item._id === taskId));
    const taskDoneFromStore = useSelector((state) => state.progress.done.taskItems.find((item) => item._id === taskId));
    const {projectId} = useLocation().state;

    const [title, setTaskTitle] = useState('');
    const [description, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    console.log(taskId);
    console.log('Task:', taskFromStore);
    console.log('Task:', taskProgressFromStore);
    console.log('Task:', taskDoneFromStore);

    useEffect(() => {
        dispatch(getProgressbyId(taskId))
    }, [dispatch, taskId]);

    useEffect(() => {
        if (taskFromStore) {
            setTaskTitle(taskFromStore.title);
            setTaskDescription(taskFromStore.description);
            setDueDate(new Date(taskFromStore.dueDate).toISOString().split('T')[0]);
        }
    }, [initialTask]);

    useEffect(() => {
        if (taskProgressFromStore) {
            setTaskTitle(taskProgressFromStore.title);
            setTaskDescription(taskProgressFromStore.description);
            setDueDate(new Date(taskProgressFromStore.dueDate).toISOString().split('T')[0]);
        }
    }, [initialTask]);

    useEffect(() => {
        if (taskDoneFromStore) {
            setTaskTitle(taskDoneFromStore.title);
            setTaskDescription(taskDoneFromStore.description);
            const date = new Date(taskDoneFromStore.dueDate);
            const formattedDate = date.toISOString().split('T')[0];
            setDueDate(formattedDate);
        }
    }, [initialTask]);


    const handleUpdate = async (e) => {
        e.preventDefault();
        await dispatch(editTask({ id: taskId, title, description, dueDate }));
        await dispatch(getTodo(projectId))
        await dispatch(getInProgress(projectId))
        await dispatch(getDone(projectId))
        toggleEditModal();

    };

    return (
        <div id="add-task-modal" className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={toggleEditModal}> x</span>
                <h2>Edit Task</h2>
                <form id="add-task-form" onSubmit={handleUpdate} >
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
                    <input
                        type="date"
                        id="due-date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Update