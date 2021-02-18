import React from "react";
import { useConversations } from "../../context/ConversationProvider";
import "./chatcomponent.css";

const ChatBoxHeader = () => {
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
    <div className="chat-component-header p-3 shadow-sm">
      {name != null ? name : no}
    </div>
  );
};

export default ChatBoxHeader;
