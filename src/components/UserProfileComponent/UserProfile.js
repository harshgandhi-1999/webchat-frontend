import React from "react";
import SideDrawer from "../SideDrawer/SideDrawer";
import { useAuth } from "../../context/AuthProvider";
import "./userprofile.css";
import userImage from "../../assets/photo.jpg";

const UserProfile = ({ show, closeDrawer }) => {
  const { user } = useAuth();
  return (
    <SideDrawer title="Profile" show={show} closeDrawer={closeDrawer}>
      <div className="profile-container">
        <div className="user-profile-image">
          <img src={userImage} alt="" />
        </div>
        <div className="user-name">
          <div className="blue-text">Username</div>
          <div>{user.username}</div>
        </div>
        <div className="contact-no">
          <div className="blue-text">Contact No</div>
          <div>{user.contactNo}</div>
        </div>
        <div className="about-info">
          <div className="blue-text">About</div>
          <div>status</div>
        </div>
      </div>
    </SideDrawer>
  );
};

export default UserProfile;
