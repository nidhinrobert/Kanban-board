import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addProject } from "./projectSlice";
import { useLocation } from "react-router-dom";


export const getUser = createAsyncThunk('getUser', async (projectId) => {
    try {
        const response = await axios.get(`http://localhost:8001/api/kanban/project/user/project?projectId=${projectId}`);
        if (!response.data) {
            throw new Error(' project User not found')
        }
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error, "failed to retrieve User");
        throw error;

    }
});
export const addUser = createAsyncThunk('project/addUser', async ({ name, email, projectId }) => {
    try {
        const response = await axios.post(`http://localhost:8001/api/kanban/project/user`, { name, email, projectId })

        if (!response.data) {
            throw new Error('failed to add');
        }
        return response.data
    } catch (error) {
        throw error;
    }
})
export const editUser = createAsyncThunk('tasks/edituser', async ({ id, name, email }) => {
    try {
        const response = await axios.put(`http://localhost:8001/api/kanban/project/user/${id}`, { name, email });
        return response.data;
    } catch (error) {
        throw error;
    }
}
);
export const getUserbyId = createAsyncThunk('task/getUserbyId', async (id) => {
    try {
        const response = await axios.get(`http://localhost:8001/api/kanban/project/user/${id}`);
        if (!response.data) {
            throw new Error('failed to get data')
        }
        return response.data
    } catch (error) {
        throw new Error("failed to retrieve data")
    }
})

export const deleteUser = createAsyncThunk('task/deleteUser', async (id,{dispatch,projectId}) => {
    try {
        const response = await axios.delete(`http://localhost:8001/api/kanban/project/user/${id}`);
        const projectId = useLocation().state.projectId;
       await console.log(projectId,"project");
       await dispatch(getUser(projectId));
        return response.data;

    } catch (error) {
        throw new Error('Failed to delete task');
    }
});

export const createAssign = createAsyncThunk('task/assign', async ({ assignName, taskId }) => {
    try {
        const response = await axios.post(`http://localhost:8001/api/kanban/task/assign/`, { assignName, taskId })

        if (!response.data) {
            throw new Error('failed to assign');
        }
        return response.data
    } catch (error) {
        throw error;
    }
})
export const getAssign = createAsyncThunk('task/get/Assign', async (taskId) => {
    try {
        const response = await axios.get(`http://localhost:8001/api/kanban/task/assign/assign?taskId=${taskId}`);
        if (!response.data) {
            throw new Error('assign  not found')
        }
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error, "failed to retrieve Assign");
        throw error;

    }
});
export const deleteAssign = createAsyncThunk('task/deleteAssign', async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8001/api/kanban/task/assign/${id}`);
        return response.data;

    } catch (error) {
        throw new Error('Failed to delete task');
    }
});



const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        assignTask:[],
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getAssign.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assignTask = action.payload; 
            })
            .addCase(getAssign.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getUserbyId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(getUserbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createAssign.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assignTask = action.payload;
            })
            .addCase(createAssign.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteAssign.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assignTask = state.assignTask.filter(assign => assign._id !== action.payload);
            })

    }
})

export default userSlice.reducer;