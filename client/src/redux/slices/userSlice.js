import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// 🔹 Async thunks
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (username, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${username}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch profile");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.put(`/users/update`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update profile");
    }
  }
);

// 🔹 Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    status: "idle",   // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearUserProfile: (state) => {
      state.profile = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
