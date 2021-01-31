import React from "react";
import MessageComponent from "./MessageComponent";
import "./chatlistscrollbar.css";
import { useConversations } from "../../context/ConversationContext";

const ChatBox = () => {
  const { selectedConversation } = useConversations();
  return (
    <div className="message-list flex-grow-1 px-4 py-4 d-flex flex-column justify-content-start align-items-start overflow-auto">
      {selectedConversation &&
        selectedConversation.messages &&
        selectedConversation.messages.map((item) => {
          return <MessageComponent text={item.message} fromMe={item.fromMe} />;
        })}
    </div>
  );
};

export default ChatBox;
