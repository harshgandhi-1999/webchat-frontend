import React from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBox from "./ChatBox";
import SendMessageForm from "./SendMessageForm";
import { useConversations } from "../../context/ConversationContext";

const ChatComponent = () => {
  // const [messages, setMessages] = useState([]);
  const { selectedConversation } = useConversations();
  console.log(selectedConversation);
  return (
    <div className="w-50 d-flex flex-column justify-content-between">
      {(selectedConversation && (
        <>
          <ChatBoxHeader />
          <ChatBox />
          <SendMessageForm />
        </>
      )) || (
        <div className="align-self-center">
          Please a select a conversation to chat...
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
