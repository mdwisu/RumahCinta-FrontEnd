import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  value: 0,
  token: null,
  user: null,
  isLoading: false,
  error: null,
  isLogin: false,
};

// !Membuat thunk untuk mengambil user
export const fetchUser = createAsyncThunk("auth/fetchUser", async (token, thunkAPI) => {
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  } catch (error) {
    // Menggunakan rejectWithValue untuk mengirim error ke action payload
    return thunkAPI.rejectWithValue(error.message);
  }
});

// !logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// !Thunk API untuk memvalidasi token JWT
export const validateToken = createAsyncThunk("auth/validateToken", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return rejectWithValue("Token tidak tersedia");
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token tidak valid");
    }

    return await response.json();
  } catch (error) {
    localStorage.removeItem("token");
    return rejectWithValue(error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // localStorage.setItem("user_id", action.payload.user_id);
      // localStorage.setItem("user_role", action.payload.role);
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.isLogin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(validateToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", "true"); // Simpan ke localStorage
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        localStorage.removeItem("isAuthenticated"); // Hapus dari localStorage
        state.error = action.payload;
      });
  },
});

export const { setToken, setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
