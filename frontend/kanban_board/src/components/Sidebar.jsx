import React from 'react';
import "./Project.css";
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { projectId } = useLocation().state;
  const navigate = useNavigate();

  const handleUser = () => {
    navigate("/project/kanban/user", { state: { projectId } });
  }

  const handleKanban = () => {
    navigate("/project/kanban",{ state: { projectId } });
  }
  const projects = () => {
    navigate("/");
};

  return (
    <div className='sidebar'>
      <button className='sidebar-button' onClick={handleKanban}>Boards</button>
      <button className='sidebar-button' onClick={handleUser}>User</button>
      <button className='sidebar-button' onClick={projects}>Project</button>
    </div>
  );
}

export default Sidebar;
