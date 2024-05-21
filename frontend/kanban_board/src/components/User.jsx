import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useDispatch } from 'react-redux';
import { deleteUser, getUser, getUserbyId } from '../redux/userSlice';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddUers from './AddUers';
import EditUser from './EditUser';
import Sidebar from './Sidebar';
import DeleteUser from './DeleteUser';
import './Add.css'


const User = () => {


    const dispatch = useDispatch();
    const projectId = useLocation().state.projectId;
    const users = useSelector((state) => state.user.users.Users)

    const [modal, setModal] = useState(false);
    const [Editmodal, setEditModal] = useState(false);
    const [deletemodal, setDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);


    useEffect(() => {
        dispatch(getUser(projectId));
    }, [dispatch]);

    const toggleModal = () => {
        setModal(!modal);

    };

    const viewDetails = async (id) => {
        dispatch(getUserbyId(id));
        await dispatch(getUser(projectId))
        setSelectedUserId(id);
    };
    const toggleEditModal = async (id) => {
        viewDetails(id);
        setEditModal(!Editmodal);
    };
    const handleDelete = async (id) => {
        await setSelectedUserId(id);
        await setDeleteModal(!deletemodal)
    }
    const cancelDelete = () => {
        setDeleteModal(false);
    };
    const confirmDelete = () => {
        if (selectedUserId) {
            dispatch(deleteUser(selectedUserId));
            dispatch(getUser(projectId));
            setDeleteModal(false);
        }
    };



    return (
        <div>
            <Header />

            <div className='layout'>
                <Sidebar />
                <div className='containerr'>
                    <div className='heading'>

                        <h2>Users</h2>
                    </div>
                    <button className='addProj' onClick={toggleModal}  >
                        Add User
                    </button>
                    {modal && <AddUers toggleModal={toggleModal} projectId={projectId} />}
                    <div className='project'>
                        <table>
                            <thead>
                                <tr>
                                    <th>sl.no</th>
                                    <th>name</th>
                                    <th>Email</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) &&
                                    users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>

                                            <td>
                                                <div className='btncont'>
                                                <button className='btna' onClick={() => toggleEditModal(user._id)}>Edit</button>
                                                <button className='btna' onClick={() => { handleDelete(user._id) }} >Delete</button>
                                                </div>
                                            </td>


                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        


    

                    </div>
                </div>
            </div>
            {Editmodal && selectedUserId && <EditUser toggleEditModal={toggleEditModal} userId={selectedUserId} />}
            {deletemodal && (
                <DeleteUser onCancel={cancelDelete} onConfirm={confirmDelete} />
            )}
        </div>
    )
}

export default User