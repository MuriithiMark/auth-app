import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import modalReducer from "./modal/modalSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer
    }
})