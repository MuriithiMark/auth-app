import React from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLoginModal,
  toggleRegisterModal,
} from "../../features/modal/modalSlice";
import PersonCircle from "../icons/PersonCircle";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(toggleLoginModal());
    console.log("Handle Login");
  };

  const handleRegister = () => {
    dispatch(toggleRegisterModal());
    console.log("Handle Register");
  };

  return (
    <header>
      <span>
        <a href="/">Home</a>
      </span>
      <nav></nav>
      <div className="accounts">
        {!isLoggedIn ? (
          <>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>{" "}
          </>
        ) : (
          <button className="accounts-btn">
            <PersonCircle width={40} height={40} color={'gray'} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
