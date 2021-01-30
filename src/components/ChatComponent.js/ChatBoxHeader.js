import React from "react";
import { useConversations } from "../../context/ConversationContext";
import "./chatcomponent.css";

const ChatBoxHeader = () => {
  const { selectedConversation } = useConversations();
  let name =
    selectedConversation && selectedConversation.recipient.recipientName;
  let no = selectedConversation && selectedConversation.recipient.recipientNo;
  return (
    <div className="chat-component-header p-3 shadow-sm">
      {name != null ? name : no}
    </div>
  );
};

export default ChatBoxHeader;
