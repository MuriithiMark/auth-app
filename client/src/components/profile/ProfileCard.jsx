import React from "react";
import { useSelector } from "react-redux";
import "./profile-card.css";

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    user && (
      <div className="profile-card">
        <h1>Hello {user.username}</h1>
      </div>
    )
  );
};

export default ProfileCard;
