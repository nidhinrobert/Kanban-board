import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getProjects = createAsyncThunk('project/getProject', async () => {
    try {
        const response = await axios.get(`http://localhost:8001/api/kanban/project/all`)
        if (!response.data) {
            throw new Error('projects not found')
        }
        return response.data
    } catch (error) {
        console.log(error, "failed to retrieve project");
        throw error;

    }
});

export const addProject = createAsyncThunk('project/addproject', async ({ heading, description, dueDate }) => {
    try {
        const response = await axios.post(`http://localhost:8001/api/kanban/project`, { heading, description, dueDate })

        if (!response.data) {
            throw new Error('failed to add');
        }
        return response.data
    } catch (error) {
        throw error;
    }
})

export const editProject = createAsyncThunk('tasks/editProject', async ({ id, heading, description, dueDate }) => {
    try {
        const response = await axios.put(`http://localhost:8001/api/kanban/project/${id}`, { heading, description, dueDate });
        return response.data;
    } catch (error) {
        throw error;
    }
}
);
export const getProjectbyId = createAsyncThunk('task/getProjectbyId', async (id) => {
    try {
        const response = await axios.get(`http://localhost:8001/api/kanban/project/${id}`);
        if (!response.data) {
            throw new Error('failed to get data')
        }
        return response.data
    } catch (error) {
        throw new Error("failed to retrieve data")
    }
})

export const deleteProject = createAsyncThunk('task/deleteTask', async (id, { dispatch }) => {
    try {
      const response = await axios.delete(`http://localhost:8001/api/kanban/project/${id}`);  
      dispatch(getProjects());
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  });




const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projects: [],
        project: null,
        status: 'idle',
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(getProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addProject.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(addProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editProject.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editProject.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.project = action.payload
            })
            .addCase(editProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getProjectbyId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.project = action.payload;
            })
            .addCase(getProjectbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.status = "succeeded"; 
                state.projects = state.projects.filter(project => project._id !== action.payload);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
    }
})

export default projectSlice.reducer;