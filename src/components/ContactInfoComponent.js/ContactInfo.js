import React from "react";
import contactImage from "../../assets/contactImage.png";

const ContactInfo = () => {
  return (
    <div className="w-25 p-4 d-flex flex-column justify-content-start align-items-center shadow-2xl">
      <div className="contact-profile d-flex flex-column align-items-center">
        <div className="contact-image mb-2 rounded-full text-center w-75 h-75">
          <img src={contactImage} alt=""/>
        </div>
        <div className="contact-name fs-3 font-bold text-center mb-1">
          Username
        </div>
        <div className="contact-status mb-4 text-center text-gray-400">
          status
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
