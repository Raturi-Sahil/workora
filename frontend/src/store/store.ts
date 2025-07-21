import { configureStore } from "@reduxjs/toolkit";
import themeToggleReducer from '../feature/theme/themeToggleSlice'
import authReducer from "../feature/auth/authSlice"

export const store = configureStore({
    reducer: {
        theme: themeToggleReducer,
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 