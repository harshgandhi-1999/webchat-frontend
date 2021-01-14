import React from "react";
import contactImage from "../../assets/contactImage.png";

const ContactInfo = () => {
  return (
    <div className="w-1/4 p-4 flex flex-col justify-start items-center shadow-2xl">
      <div className="contact-profile flex flex-col items-center">
        <div className="contact-image mb-2 rounded-full text-center w-3/4 h-3/4">
          <img src={contactImage} alt="contact-image" />
        </div>
        <div className="contact-name text-lg font-bold text-center mb-1">
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
