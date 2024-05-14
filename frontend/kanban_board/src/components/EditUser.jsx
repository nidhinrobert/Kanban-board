import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { editUser, getUser, getUserbyId } from '../redux/userSlice';
import { useLocation } from 'react-router-dom';

const EditUser = ({toggleEditModal, userId}) => {

    const user = useSelector((state) => state.user.users)
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const projectId = useLocation().state
console.log(userId,"userId");
    useEffect(() => {
        dispatch(getUserbyId(userId));
    }, [dispatch, userId]);


    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
           
        }
    }, [user]);

    const updateUser = async (e) => {
        e.preventDefault();

        const newData = {
            id: userId,
            name,
            email
           
        };

        try {
            console.log(newData,"newdata");
            await dispatch(editUser(newData));
            toggleEditModal();
            dispatch(getUser(projectId))
        } catch (error) {
            console.error('Error updating project:', error);
           
        }
    };

  return (
    <div id="add-task-modal" className="editmodal">
    <div className="editmodal-content">
        <span className="close-buttonn" onClick={toggleEditModal}> x</span>
        <h2>Edit User</h2>
        <form id="add-task-form" onSubmit={updateUser}>
            <input
                type="text"
                id="task-title"
                placeholder="Task Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                id="task-title"
                placeholder="Task Title"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
           
            <button type="submit">Submit</button>
        </form>
    </div>
</div>
  )
}

export default EditUser