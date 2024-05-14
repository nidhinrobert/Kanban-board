import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProject, getProjectbyId, getProjects } from '../redux/projectSlice';

const EditProject = ({ toggleEditModal, projectId }) => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.project);

    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    
    useEffect(() => {
        dispatch(getProjectbyId(projectId));
    }, [dispatch, projectId]);

    
    useEffect(() => {
        if (project) {
            setHeading(project.heading || '');
            setDescription(project.description || '');
            setDueDate(project.dueDate ? new Date(project.dueDate).toISOString().split('T')[0] : '');
        }
    }, [project]);

    const updateProject = async (e) => {
        e.preventDefault();

        const newData = {
            id: projectId,
            heading,
            description,
            dueDate
        };

        try {
            console.log(newData,"newdata");
            await dispatch(editProject(newData));
            toggleEditModal();
            dispatch(getProjects())
        } catch (error) {
            console.error('Error updating project:', error);
           
        }
    };

    return (
        <div id="add-task-modal" className="editmodal">
            <div className="editmodal-content">
                <span className="close-buttonn" onClick={toggleEditModal}> x</span>
                <h2>Edit Project</h2>
                <form id="add-task-form" onSubmit={updateProject}>
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
    );
};

export default EditProject;
