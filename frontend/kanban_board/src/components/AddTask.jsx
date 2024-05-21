import React from 'react';
import './Add.css'; 
import { useDispatch } from 'react-redux';
import { addTask, getDone, getInProgress, getTodo } from '../redux/taskSlice';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title Required';
  } else if (values.title.length > 15) {
    errors.title = 'Must be 15 characters or less';
  }

  if (!values.description) {
    errors.description = 'Description Required';
  }

  if (!values.dueDate) {
    errors.dueDate = 'duedate Required';
  }

  return errors;
};

const AddTask = ({ toggleModal, projectId }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: 'todo',
      dueDate: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const newTask = {
          title: values.title,
          description: values.description,
          projectId: projectId,
          status: values.status,
          dueDate: values.dueDate,
        };
        await dispatch(addTask(newTask));
        toggleModal();
        dispatch(getTodo(projectId));
        dispatch(getInProgress(projectId));
        dispatch(getDone(projectId));
      } catch (error) {
        console.error('failed to add', error);
      }
    },
  });

  return (
    <div id="add-task-modal" className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={toggleModal}> x</span>
        <h2>Add New Task</h2>
        <form id="add-task-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            id="task-title"
            placeholder="Task Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
          <textarea
            id="task-description"
            placeholder="Task Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}
          <select
            id="column-select"
            value={formik.values.status}
            onChange={formik.handleChange}
            name="status"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          Due Date:
          <input
            type="date"
            id="due-date"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            name="dueDate"
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

export default AddTask;
