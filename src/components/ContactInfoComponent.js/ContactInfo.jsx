import React from "react";
import contactImage from "../../assets/contactImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { useConversations } from "../../context/ConversationProvider";
import "./contactinfo.css";

const ContactInfo = () => {
  const { selectedConversation } = useConversations();
  const name =
    selectedConversation &&
    selectedConversation.recipient &&
    selectedConversation.recipient.recipientName;
  const no =
    selectedConversation &&
    selectedConversation.recipient &&
    selectedConversation.recipient.recipientNo;
  return (
    <div className="w-25 p-2 d-flex flex-column align-items-center shadow-lg">
      <div className="contact-image mb-2 rounded-circle">
        <img src={contactImage} alt="" />
      </div>
      <div className="contact-name font-bold mb-1">
        <h5>{name != null ? name : no}</h5>
      </div>
      <div className="contact-status mb-4">status</div>
      <div
        className="mobile-no align-self-start inline-block full-width p-1"
        style={{ color: "gray" }}
      >
        <FontAwesomeIcon icon={faMobileAlt} style={{ marginRight: "0.5rem" }} />
        {no}
      </div>
    </div>
  );
};

export default ContactInfo;
