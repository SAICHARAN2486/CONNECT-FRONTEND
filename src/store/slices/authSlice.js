import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await API.post('/auth/login', userData);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

let user = null;
try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user = JSON.parse(storedUser);
    }
} catch (error) {
    console.error('Failed to parse user from localStorage', error);
    localStorage.removeItem('user');
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: user ? user : null,
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
        },
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
        updateUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => { state.isLoading = true; })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { logout, reset, updateUser } = authSlice.actions;
export default authSlice.reducer;
