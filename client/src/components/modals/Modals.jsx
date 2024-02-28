// Exports all modal components

import React from "react";
import LoginModal from "./login/LoginModal";
import RegisterModal from "./register/RegisterModal";
import { useSelector } from "react-redux";

import "./modal-base.css";

const Modals = () => {
  const modal = useSelector((state) => state.modal);
  return (
    <>
      {modal.isLoginModalOpen && <LoginModal />}
      {modal.isRegisterModalOpen && <RegisterModal />}
    </>
  );
};

export default Modals;
