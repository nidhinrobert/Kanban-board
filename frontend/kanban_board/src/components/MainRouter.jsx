import React from 'react'
import { Routes,Route } from 'react-router-dom'
import KanbanBoard from './KanbanBoard'
import Project from './Project'
import User from './User'
import Assigned from './Assigned'

const MainRouter = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Project />} />
        <Route path="/project/kanban/user" element={<User />} />
        <Route path="/project/kanban" element={<KanbanBoard />} />
        <Route path="/project/assign" element={<Assigned />} />
       
        </Routes>
    </div>
  )
}

export default MainRouter