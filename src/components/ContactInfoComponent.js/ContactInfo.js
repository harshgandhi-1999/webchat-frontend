import React from "react";
import contactImage from "../../assets/contactImage.png";
import './contactinfo.css'

const ContactInfo = () => {
  return (
    <div className="w-25 p-4 d-flex flex-column justify-content-start align-items-center shadow-lg">
      <div className="contact-profile">
        <div className="contact-image mb-2 rounded-circle h-75">
          <img src={contactImage} alt=""/>
        </div>
        <div className="contact-name font-bold mb-1">
          <h6>Username</h6>
        </div>
        <div className="contact-status mb-4">
          status
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
