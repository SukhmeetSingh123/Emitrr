import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const getUserDetails = createAsyncThunk("getUserDetails", async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/getLogedInUserDetail', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'), 
      },
    });

    const responseData = await response.json()
    return responseData;
  } catch (error) {
    throw error.message || 'Error fetching user details.';
  }
});


export const registerUser = createAsyncThunk("registerUser", async ({ name, email, password, navigate }) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseData = await response.json();
    if (responseData.error) {
      return responseData;
    }
    localStorage.setItem('authToken', responseData.authToken);
    navigate('/startpage')
    return responseData;
  } catch (error) {
    throw error.message || 'Registration failed.';
  }
});

export const logedInUser = createAsyncThunk("logedInUser", async ({ email, password, navigate }) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();
    if (responseData.error) {
      return responseData;
    }

    localStorage.setItem('authToken', responseData.authToken);
    navigate('/startpage');
    return responseData;
  } catch (error) {
    throw error.message || 'Login failed.';
  }
});

const initialState = {
  user: null,
  authToken: null,
  loading: false,
  error: null,
  success: false,

};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = "Error fetching user details";
          return;
        }
        state.user = action.payload._id;
        // state.authToken = localStorage.getItem('authToken');
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching user details.';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = "User Id Already LogedIn"
        return;
      }
      state.user = action.payload.user;
      state.authToken = action.payload.authToken;
      state.success = action.payload.success;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Registration failed.';
    })
    .addCase(logedInUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(logedInUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = "Please login With Correct Credentials"
        return;
      }
      state.user = action.payload.user;
      state.authToken = action.payload.authToken;
    })
    .addCase(logedInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Login failed.';
    });
},
});

export const { } = authSlice.actions;
export const authReducer = authSlice.reducer;
