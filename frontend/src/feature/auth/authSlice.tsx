import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/supabaseClient";
import type { Session } from "@supabase/supabase-js";

// Define AuthState type
interface AuthState {
  session: Session | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define argument types for thunk actions
interface AuthCredentials {
  email: string;
  password: string;
}

// signUpNewUser
export const signUpNewUser = createAsyncThunk<
  any, // return type (can be refined later)
  AuthCredentials,
  { rejectValue: string }
>("auth/signUpNewUser", async ({ email, password }, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return rejectWithValue(error.message);
  return data;
});

// signInUser
export const signInUser = createAsyncThunk<
  Session,
  AuthCredentials,
  { rejectValue: string }
>("auth/signInUser", async ({ email, password }, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error || !data.session) return rejectWithValue(error?.message || "No session found");
  return data.session;
});

// signOutUser
export const signOutUser = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("auth/signOut", async (_, { rejectWithValue }) => {
  const { error } = await supabase.auth.signOut();
  if (error) return rejectWithValue(error.message);
  return true;
});

// Initial state
const initialState: AuthState = {
  session: null,
  status: "idle",
  error: null,
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.session = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Sign-in failed";
      })

      // Sign Up
      .addCase(signUpNewUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpNewUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(signUpNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Sign-up failed";
      })

      // Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        state.session = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.error = action.payload || "Sign-out failed";
      });
  },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
