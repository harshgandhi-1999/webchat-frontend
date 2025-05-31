import React from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBox from "./ChatBox";
import SendMessageForm from "./SendMessageForm";
import { useConversations } from "../../context/ConversationProvider";

const ChatComponent = () => {
  // const [messages, setMessages] = useState([]);
  const { selectedConversation } = useConversations();
  return (
    (selectedConversation && (
      <div className="w-50 d-flex flex-column justify-content-between">
        <ChatBoxHeader />
        <ChatBox />
        <SendMessageForm />
      </div>
    )) || (
      <div className="w-75 d-flex flex-column justify-content-center text-center">
        <h3>Please a select a conversation to chat...</h3>
      </div>
    )
  );
};

export default ChatComponent;
