import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useConversations } from "../../context/ConversationProvider";
import "./chatcomponent.css";

const ChatBoxHeader = () => {
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
    <div className="chat-component-header p-3 shadow-sm d-flex flex-row justify-content-between">
      <div className="recipient-name">{name != null ? name : no}</div>
      <DropdownMenu color="black" size="1.2rem" tooltipText="Options">
        <Dropdown.Item>Add to contacts</Dropdown.Item>
      </DropdownMenu>
    </div>
  );
};

export default ChatBoxHeader;
