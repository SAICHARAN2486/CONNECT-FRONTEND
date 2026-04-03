import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const fetchJobs = createAsyncThunk('jobs/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await API.get('/jobs');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => { state.isLoading = true; })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export default jobSlice.reducer;
