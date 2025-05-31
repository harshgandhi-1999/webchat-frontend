import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useConversations } from "../../context/ConversationProvider";
import "./chatcomponent.css";
import AddContactModal from "../AddContactModal/AddContactModal";

const ChatBoxHeader = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const { selectedConversation } = useConversations();

  const handleClose = () => setShowContactModal(false);
  const handleOpen = () => setShowContactModal(true);

  const name =
    selectedConversation &&
    selectedConversation.recipient &&
    selectedConversation.recipient.recipientName;
  const no =
    selectedConversation &&
    selectedConversation.recipient &&
    selectedConversation.recipient.recipientNo;

  return (
    <React.Fragment>
      <AddContactModal
        show={showContactModal}
        handleClose={handleClose}
        title="ADD CONTACT"
        addName={true}
        number={no}
      />
      <div className="chat-component-header p-3 shadow-sm d-flex flex-row justify-content-between">
        <div className="recipient-name">
          {name !== null && name !== undefined ? name : no}
        </div>
        <DropdownMenu color="black" size="1.2rem" tooltipText="Options">
          {(name === null || name === undefined) && (
            <Dropdown.Item onClick={handleOpen}>Add to contacts</Dropdown.Item>
          )}
          <Dropdown.Item>Menu Item</Dropdown.Item>
        </DropdownMenu>
      </div>
    </React.Fragment>
  );
};

export default ChatBoxHeader;
