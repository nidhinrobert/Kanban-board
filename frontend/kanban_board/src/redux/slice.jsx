import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProgressbyId = createAsyncThunk('task/getProgressbyId', async (id) => {
  try {
    const response = await axios.get(`http://localhost:8001/api/kanban/${id}`);
    if (!response.data) {
      throw new Error('failed to get data')
    }
    return response.data
  } catch (error) {
    throw new Error("failed to retrieve data")
  }
})
export const addTask = createAsyncThunk('items/addTask', async ({ title, description, status, dueDate }) => {
  try {
    const response = await axios.post('http://localhost:8001/api/kanban/', { title, description, status, dueDate });

    if (!response.data) {
      throw new Error('failed to add');
    }
    return response.data
  } catch (error) {
    throw error;
  }
})
export const getTodo = createAsyncThunk('getTodo', async () => {
  try {
    const response = await axios.get(`http://localhost:8001/api/kanban/user/todo`);
    if (!response.data) {
      throw new Error('todo task not found')
    }
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log(error, "failed to retrieve tasks");
    throw error;

  }
});
export const getInProgress = createAsyncThunk('getInProgress', async () => {
  try {
    const response = await axios.get(`http://localhost:8001/api/kanban/user/inProgress`);
    if (!response.data) {
      throw new Error('In progress task not found')
    }
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log(error, "failed to retrieve tasks");
    throw error;

  }
});
export const getDone = createAsyncThunk('getDone', async () => {
  try {
    const response = await axios.get(`http://localhost:8001/api/kanban/user/done`);
    if (!response.data) {
      throw new Error('In done task not found')
    }
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log(error, "failed to retrieve tasks");
    throw error;

  }
});

export const updateStatus = createAsyncThunk('updateStatus', async ({ id, newStatus }) => {
  try {
    const response = await axios.put(`http://localhost:8001/api/kanban/taskStatus/${id}`, { newStatus });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const editTask = createAsyncThunk('tasks/editTask', async ({ id, title, description, dueDate }) => {
  try {
    const response = await axios.put(`http://localhost:8001/api/kanban/${id}`, { title, description, dueDate });
    return response.data;
  } catch (error) {
    throw error;
  }
}
);

export const deleteTask = createAsyncThunk('task/deleteTask', async (id, { dispatch }) => {
  try {
    const response = await axios.delete(`http://localhost:8001/api/kanban/${id}`);
    dispatch(getTodo());       
    dispatch(getInProgress()); 
    dispatch(getDone());   
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete task');
  }
});



const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    items: [],
    inProgress: [],
    done: [],
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder


      .addCase(getTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getInProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.inProgress = action.payload;
      })
      .addCase(getInProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getDone.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.done = action.payload;
      })
      .addCase(getDone.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })

      .addCase(updateStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })

      .addCase(editTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProgressbyId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
      })
      .addCase(getProgressbyId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTaskId = action.payload;
        state.items = state.items.filter(task => task.id !== deletedTaskId);
        state.inProgress = state.inProgress.filter(task => task.id !== deletedTaskId);
        state.done = state.done.filter(task => task.id !== deletedTaskId);
       
    });
  },
});

export default progressSlice.reducer;
