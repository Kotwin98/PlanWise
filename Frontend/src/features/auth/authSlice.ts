
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

interface UserInfo {
  // user info (to be added) 
}

interface AuthState {
  loading: boolean;
  userInfo: UserInfo;
  userToken: string | null;
  error: string | unknown;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const signUpUser = createAsyncThunk<string, SignUpData>(
  'auth/signUp',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post('user/signup', { name, email, password }, config);
      return 'User registered successfully';
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default authSlice.reducer;
