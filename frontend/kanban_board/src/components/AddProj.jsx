import React, { useState } from 'react';
import './Add.css';
import { useDispatch } from 'react-redux';
import { addProject, getProjects } from '../redux/projectSlice';
import { useFormik } from 'formik';


const validate = values => {
    const errors = {};


    if (!values.heading) {
        errors.heading = 'Required heading';
    } else if (values.heading.length > 15) {
        errors.heading = 'Must be 15 characters or less';
    }

    if (!values.description) {
        errors.description = 'Required description';
    }

    if (!values.dueDate) {
        errors.dueDate = 'Required duedate';
    }
    return errors;
};


const AddProj = ({ toggleModal }) => {


    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            heading: '',
            description: '',
            dueDate:'',
        },
        validate,
        onSubmit: async(values) => {
            try{
                await dispatch(addProject(values));
                dispatch(getProjects());
                toggleModal();
            }catch(error){
                console.error("Failed to add project", error);
            }
        }
    })



    


    return (
        <div id="add-task-modal" className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={toggleModal}> x</span>
                <h2>Add Project</h2>
                <form id="add-task-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        id="task-title"
                        placeholder="Project Heading"
                        name="heading"
                        value={formik.values.heading}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    
                    />
                    {formik.touched.heading&&formik.errors.heading?(
                        <div className="error">{formik.errors.heading}</div>
                    ) : null}
                     <textarea
                        id="task-description"
                        placeholder="Project Description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                        <div className="error">{formik.errors.description}</div>
                    ) : null}
                    Due Date:
                    <input
                        type="date"
                        id="due-date"
                        name="dueDate"
                        value={formik.values.dueDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        
                    />
                    {formik.touched.dueDate && formik.errors.dueDate ? (
                        <div className="error">{formik.errors.dueDate}</div>
                    ) : null}
                    <button type="submit">Add Task</button>
                </form>
            </div>
        </div>
    );
};

export default AddProj;
