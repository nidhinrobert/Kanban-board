

import React, { useEffect, useState } from 'react';
import Header from './Header';
import './Project.css';
import './Add.css';
import { useDispatch } from 'react-redux';
import { deleteProject, getProjectbyId, getProjects, setCurrentPage, setItemsPerPage } from '../redux/projectSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddProj from './AddProj';
import EditProject from './EditProject';
import DeleteProject from './DeleteProject';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Project = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projects = useSelector((state) => state.project.projects.Projects);
    const [modal, setModal] = useState(false);
    const [Editmodal, setEditModal] = useState(false);
    const [deletemodal, setDeleteModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const currentPage = useSelector((state) => state.project.currentPage);
    const itemsPerPage = useSelector((state) => state.project.itemsPerPage);
    const userCount = useSelector((state) => state.project.projectCount);


    useEffect(() => {
        dispatch(getProjects({ currentPage, itemsPerPage }));
    }, [dispatch,  currentPage, itemsPerPage ]);

    

    const handlePageChange = (event, page) => {
        dispatch(setCurrentPage(page));
    };

    const handleItemsPerPageChange = (event) => {
        dispatch(setItemsPerPage(event.target.value));
    };


    const toggleModal = () => {
        setModal(!modal);
    };

    const viewDetails = async (id) => {
        await dispatch(getProjectbyId(id));
        setSelectedProjectId(id);
    };

    const toggleEditModal = async (id) => {
        viewDetails(id);
        setEditModal(!Editmodal);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const handleTask = (project) => {
        navigate('/project/kanban', { state: { projectId: project._id } });
    };

    const handleDelete = async (id) => {
        await setSelectedProjectId(id);
        await setDeleteModal(!deletemodal)
    }
    const cancelDelete = () => {
        setDeleteModal(false);
    };
    const confirmDelete = () => {
        if (selectedProjectId) {
            dispatch(deleteProject(selectedProjectId));

            setDeleteModal(false);
        }
    };

    return (
        <div>
            <Header />
            <div className='layout'>

                <div className='containerr'>
                    <div className='heading'>
                        <h2>Projects</h2>
                    </div>
                    <div className='adding'>
                        <button className='addProj' onClick={toggleModal}>
                            Add Project
                        </button>
                    </div>
                    {modal && <AddProj toggleModal={toggleModal} />}
                    <div className='project'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl no.</th>
                                    <th>Project Name</th>
                                    <th>Description</th>
                                    <th>Created Date</th>
                                    <th>Due Date</th>
                                    <th></th>
                                    <th>View tasks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(projects) &&
                                    projects.map((project, index) => (
                                        <tr key={index}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{project.heading}</td>
                                            <td>{project.description}</td>
                                            <td>{formatDate(project.createdAt)}</td>
                                            <td>{new Date(project.dueDate).toLocaleDateString()}</td>
                                            <td>
                                                <div className='btncont'>
                                                    <button className='btna' onClick={() => toggleEditModal(project._id)}>Edit</button>
                                                    <button className='btna' onClick={() => { handleDelete(project._id) }}>Delete</button>
                                                </div>
                                            </td>
                                            <td>
                                                <button className='taskBtt' onClick={() => handleTask(project)}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <Stack spacing={2}>
     
                        <Pagination
                                    count={Math.ceil(userCount / itemsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
      
    </Stack>
                    </div>
                </div>
            </div>
            {Editmodal && selectedProjectId && <EditProject toggleEditModal={toggleEditModal} projectId={selectedProjectId} />}
            {deletemodal && (
                <DeleteProject onCancel={cancelDelete} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default Project;
