import { createSlice } from "@reduxjs/toolkit";

const intialAuthState = {
    isLoggedIn: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: intialAuthState,
    reducers: {
        onLogin: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        },
        onLogout: (state, action) => {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        }
    }
})

export const { onLogin, onLogout } = authSlice.actions;
export default authSlice.reducer;