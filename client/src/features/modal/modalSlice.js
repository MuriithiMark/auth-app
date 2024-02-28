import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
    isLoginModalOpen: false,
    isRegisterModalOpen: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState: initialModalState,
    reducers: {
        toggleLoginModal: (state, action) => {
            // ensure that register modal cannot be open
            return ({
                ...state,
                isLoginModalOpen: !state.isLoginModalOpen,
                isRegisterModalOpen: false
            })
        },
        toggleRegisterModal: (state, action) => {
            // ensure that login modal cannot be open
            return ({
                ...state,
                isRegisterModalOpen: !state.isRegisterModalOpen,
                isLoginModalOpen: false
            })
        }
    }
})

export const {
    toggleLoginModal,
    toggleRegisterModal
} = modalSlice.actions

export default modalSlice.reducer;