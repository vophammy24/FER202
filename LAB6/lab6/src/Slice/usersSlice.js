import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
  error: null
} 

export const getUsers = createAsyncThunk (
  "users/fetchUsers",
  async (_, thunkAPI) => {
    const res = await fetch(`/api/users`);

    if (!res.ok) {
      return thunkAPI.rejectWithValue("Fetch users failed");
    }

    return await res.json();
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleAdminStatus(state, action){
        const user = state.list.find(u => u.id === action.payload);
        if (user){
            user.isAdmin = !user.isAdmin;
        }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error;
    });
  }
});

export const {toggleAdminStatus} = usersSlice.actions;
export default usersSlice.reducer;