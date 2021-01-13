import React from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBox from "./ChatBox";
import MessageComponent from "./MessageComponent";

const ChatComponent = () => {
  return (
    <div className="w-2/4 flex flex-col justify-between">
      <ChatBoxHeader />
      <ChatBox />
      <MessageComponent />
    </div>
  );
};

export default ChatComponent;
