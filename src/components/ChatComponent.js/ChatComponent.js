import React from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBox from "./ChatBox";
import SendMessageForm from "./SendMessageForm";

const ChatComponent = () => {
  // const [messages, setMessages] = useState([]);
  return (
    <div className="w-50 d-flex flex-column justify-content-between">
      <ChatBoxHeader />
      <ChatBox/>
      <SendMessageForm />
    </div>
  );
};

export default ChatComponent;
