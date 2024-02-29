import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./profile-card.css";
import { onLogout } from "../../features/auth/authSlice";
import Cookies from "universal-cookie";
const cookies = new Cookies()

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auth/logout`, {
        credentials: "include"
      })
      const responseData = await response.json()
      if(responseData.status === "fail") {
        // handle if logout fails
        return;
      }
      cookies.remove("auth_token")
      dispatch(onLogout())
    } catch (error) {
      
    }
  
  }

  return (
    user && (
      <div className="profile-card">
        <h1>Hello {user.username}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  );
};

export default ProfileCard;
