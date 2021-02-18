import React from "react";
import contactImage from "../../assets/contactImage.png";
import { useConversations } from "../../context/ConversationProvider";
import "./contactinfo.css";

const ContactInfo = () => {
  const { selectedConversation } = useConversations();
  let name =
    selectedConversation &&
    selectedConversation.recipient &&
    selectedConversation.recipient.recipientName;
  let no =
    selectedConversation &&
    selectedConversation.recipient &&
    selectedConversation.recipient.recipientNo;
  return (
    <div className="w-25 p-4 d-flex flex-column justify-content-start align-items-center shadow-lg">
      <div className="contact-profile">
        <div className="contact-image mb-2 rounded-circle h-75">
          <img src={contactImage} alt="" />
        </div>
        <div className="contact-name font-bold mb-1">
          <h6>{name != null ? name : no}</h6>
        </div>
        <div className="contact-status mb-4">status</div>
      </div>
    </div>
  );
};

export default ContactInfo;
