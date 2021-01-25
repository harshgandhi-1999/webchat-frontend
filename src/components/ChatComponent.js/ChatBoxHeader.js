import React from "react";
import { useContacts } from "../../context/ContactContext";
import "./chatcomponent.css";

const ChatBoxHeader = () => {
  const { selectedContact } = useContacts();
  console.log(selectedContact);
  return (
    <div className="chat-component-header p-3 shadow-sm">
      {selectedContact
        ? selectedContact.name !== null && selectedContact.name.length > 0
          ? selectedContact.name
          : selectedContact.contactNo
        : "Username"}
    </div>
  );
};

export default ChatBoxHeader;
