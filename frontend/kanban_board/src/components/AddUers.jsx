import React from 'react';
import { useFormik } from 'formik';
import { addUser, getUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const AddUsers = ({ toggleModal, projectId }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const newUser = {
          name: values.name,
          email: values.email,
          projectId: projectId,
        };
        await dispatch(addUser(newUser)); 
        dispatch(getUser(projectId));
        toggleModal();
      } catch (error) {
        console.error("Failed to add", error);
      }
    },
  });

  return (
    <div id="add-task-modal" className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={toggleModal}> x</span>
        <h2>Add User</h2>
        <form id="add-task-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            id="task-title"
            placeholder="Name here"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
          <input
            type="email"
            id="task-email"
            placeholder="Email Here"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <button type="submit">Add User</button> 
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
