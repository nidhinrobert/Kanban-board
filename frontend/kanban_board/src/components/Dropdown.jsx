import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { createAssign, deleteAssign, getAssign, getUser } from '../redux/userSlice';
import { useSelector } from 'react-redux';



const Dropdown = ({ projectId,taskId }) => {
  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const anchorRef = React.useRef(null);
  const secondAnchorRef = React.useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(getUser(projectId));
    }
    if (taskId) {
      dispatch(getAssign(taskId));
    }
  }, [dispatch, projectId, taskId]);

  

  const users = useSelector((state) => state.user.users.Users);
  const assign = useSelector((state) => state.user.assignTask.Assigns);

  


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSecondToggle = async () => {
    setSecondOpen((prevOpen) => !prevOpen);
    if (taskId) {
      console.log(assign,"assign");
      console.log(users,"use");
      await dispatch(getAssign(taskId));
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSecondClose = (event) => {
    if (secondAnchorRef.current && secondAnchorRef.current.contains(event.target)) {
      return;
    }

    setSecondOpen(false);
  };

  const handleUserClick = (user) => {
    console.log("hidaa");
    setSelectedUser(user);
    setOpen(false);
    if (user) {
      const newAssign = {
        assignName: user.name,
        taskId: taskId
      };
      dispatch(createAssign(newAssign));
    }
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function handleSecondListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setSecondOpen(false);
    } else if (event.key === 'Escape') {
      setSecondOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const prevSecondOpen = React.useRef(secondOpen);
  React.useEffect(() => {
    if (prevSecondOpen.current === true && secondOpen === false) {
      secondAnchorRef.current.focus();
    }

    prevSecondOpen.current = secondOpen;
  }, [secondOpen]);


  const handleDeleteAssign = async(assignId) => {
    dispatch(deleteAssign(assignId));
    await dispatch(getAssign(taskId));
};

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Assign On
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {Array.isArray(users) && users.map((user, index) => (
                      <MenuItem key={index} onClick={() => handleUserClick(user)}> {user.name}</MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div>
        <Button
          ref={secondAnchorRef}
          id="assigned-list-button"
          aria-controls={secondOpen ? 'assigned-list-menu' : undefined}
          aria-expanded={secondOpen ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleSecondToggle}
        >
          Assigned List
        </Button>
        <Popper
          open={secondOpen}
          anchorEl={secondAnchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleSecondClose}>
                  <MenuList
                    autoFocusItem={secondOpen}
                    id="assigned-list-menu"
                    aria-labelledby="assigned-list-button"
                    onKeyDown={handleSecondListKeyDown}
                  >
                   {Array.isArray(assign) && assign.length > 0 ? (
                      assign.map((assign, index) => (
                        <MenuItem key={index}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div>{assign.assignName}</div>
                            <IconButton onClick={() => handleDeleteAssign(assign._id)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>No one has been assigned</MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}

export default Dropdown;
