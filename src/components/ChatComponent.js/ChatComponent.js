import React, { useState } from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBox from "./ChatBox";
import SendMessageForm from "./SendMessageForm";

const ChatComponent = () => {
  // const [messages, setMessages] = useState([]);
  return (
    <div className="w-2/4 flex flex-col justify-between">
      <ChatBoxHeader />
      <ChatBox/>
      <SendMessageForm />
    </div>
  );
};

export default ChatComponent;
