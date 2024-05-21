import React, { useEffect, useState } from "react";
import "../App.css";
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./AddTask";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getDone,
  getInProgress,
  getProgressbyId,
  getTodo,
  updateStatus,
} from "../redux/taskSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import Update from "./Update";
import DeleteModal from "./DeleteModal";
import { useLocation } from "react-router-dom";
import Dropdown from "./Dropdown"




function KanbanBoard() {
  const dispatch = useDispatch();

  const task = useSelector((state) => state.progress.items.taskItems);
  const inProgressTask = useSelector((state) => state.progress.inProgress.taskItems);
  const done = useSelector((state) => state.progress.done.taskItems);
  const { projectId } = useLocation().state;
  const tasksArray = Array.isArray(task) ? task : [];
  const inProgressArray = Array.isArray(inProgressTask) ? inProgressTask : [];
  const doneArray = Array.isArray(done) ? done : [];
  console.log("projectId", projectId);
  console.log(task, "taskssss");

  const [modal, setModal] = useState(false);
  const [Editmodal, setEditModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);









  useEffect(() => {
    dispatch(getTodo(projectId));
    dispatch(getInProgress(projectId));
    dispatch(getDone(projectId));
  }, [dispatch, projectId]);







  const toggleModal = () => {
    setModal(!modal);
  };
  const toggledeleteModal = () => {
    setDeleteModal(!deletemodal);
  };
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const taskId = result.draggableId;
    const newStatus = destination.droppableId;
    await dispatch(updateStatus({ id: taskId, newStatus }));

    dispatch(getTodo(projectId));
    dispatch(getInProgress(projectId));
    dispatch(getDone(projectId));
  };

  const viewDetails = async (taskId) => {
    await dispatch(getProgressbyId(taskId));
    setEditModal(!Editmodal);
  };

  const toggleEditModal = async (taskId) => {
    viewDetails(taskId);
    setSelectedTask(taskId);
  };
  const confirmDelete = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask));
      setDeleteModal(false);
      window.location.reload()
    }
  };

  const cancelDelete = () => {
    setDeleteModal(false);
  };

  const handleDelete = async (taskId) => {
    await setSelectedTask(taskId);
    await toggledeleteModal();
  };

  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <>
        <header>
          <div className="header-left">Kanban Board</div>
          <div className="header-right">
            <button className="addProj" onClick={toggleModal}>
              Add Task
            </button>
            {modal && <AddTask toggleModal={toggleModal} projectId={projectId} />}
          </div>
        </header>
        <div className="main">

          <Sidebar />
          <div className="kanban-board">
            <div className="container">
              <Droppable droppableId="todo">
                {(provided) => (
                  <div
                    className="column todo"
                    data-status="todo"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2>To Do</h2>
                    <div className="tasks" data-status="todo">
                      {tasksArray.map((tasks, index) => (
                        <Draggable
                          key={tasks._id}
                          draggableId={tasks._id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="task-content">
                                <h3>{tasks.title}</h3>
                                <p>{tasks.description}</p>
                                <p>
                                  Due Date:{" "}
                                  {new Date(tasks.dueDate).toLocaleDateString()}
                                </p>
                                <div>
                                  {/* ////// */}


                                  <Dropdown projectId={projectId} taskId={tasks._id} />



                                  {/* ///////////// */}
                                </div>
                              </div>

                              <div className="task-actions">
                                <button 
                                  onClick={() => toggleEditModal(tasks._id)}
                                  style={{
                                    backgroundColor: '#76ade9',
                                    border: 'none',
                                    borderRadius:'3px',
                                    padding: '7px',
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(tasks._id);}}
                                    style={{
                                      backgroundColor: '#76ade9',
                                      border: 'none',
                                      borderRadius:'3px',
                                      padding: '7px',
                                    }}
                                >

                                  <FontAwesomeIcon icon={faTrash} />
                                </button>

                              </div>

                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId="in-progress">
                {(provided) => (
                  <div
                    className="column in-progress"
                    data-status="in-progress"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2>In Progress</h2>
                    <div className="tasks" data-status="in-progress">
                      {inProgressArray.map((tasks, index) => (
                        <Draggable
                          key={tasks._id}
                          draggableId={tasks._id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="task"
                              key={index}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="task-content">
                                <h3>{tasks.title}</h3>
                                <p>{tasks.description}</p>
                                <p>
                                  Due Date:{" "}
                                  {new Date(tasks.dueDate).toLocaleDateString()}
                                </p>

                                <Dropdown projectId={projectId} taskId={tasks._id} />

                              </div>
                              <div className="task-actions">
                                <button
                                  onClick={() => toggleEditModal(tasks._id)}
                                  style={{
                                    backgroundColor: '#ffcbd4',
                                    border: 'none',
                                    borderRadius:'3px',
                                    padding: '7px',
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(tasks._id);}}
                                    style={{
                                      backgroundColor: '#ffcbd4',
                                      border: 'none',
                                      borderRadius:'3px',
                                      padding: '7px',
                                    }}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId="done">
                {(provided) => (
                  <div
                    className="column done"
                    data-status="done"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2>Done</h2>
                    <div className="tasks" data-status="done">
                      {doneArray.map((tasks, index) => (
                        <Draggable
                          key={tasks._id}
                          draggableId={tasks._id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="task"
                              key={index}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="task-content">
                                <h3>{tasks.title}</h3>
                                <p>{tasks.description}</p>
                                <p>
                                  Due Date:{" "}
                                  {new Date(tasks.dueDate).toLocaleDateString()}
                                </p>

                                <Dropdown projectId={projectId} taskId={tasks._id} />

                              </div>
                              <div className="task-actions">
                                <button
                                  onClick={() => toggleEditModal(tasks._id)}
                                  style={{
                                    backgroundColor: '#9fff9f',
                                    border: 'none',
                                    borderRadius:'3px',
                                    padding: '7px',
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(tasks._id);
                                  }}
                                  style={{
                                    backgroundColor: '#9fff9f',
                                    border: 'none',
                                    borderRadius:'3px',
                                    padding: '7px',
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>

        {Editmodal && (
          <Update toggleEditModal={toggleEditModal} taskId={selectedTask} />
        )}
        {deletemodal && (
          <DeleteModal onCancel={cancelDelete} onConfirm={confirmDelete} />
        )}

        <footer>
          <p>Kanban Board Application</p>
        </footer>
      </>
    </DragDropContext>

  );
}

export default KanbanBoard;