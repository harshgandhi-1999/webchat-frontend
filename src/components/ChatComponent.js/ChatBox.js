import React, { useCallback } from "react";
import MessageComponent from "./MessageComponent";
import "./chatlistscrollbar.css";
import "./chatcomponent.css";
import { useConversations } from "../../context/ConversationProvider";
import { Spinner } from "react-bootstrap";

const ChatBox = () => {
  const { selectedConversation, msgLoading } = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  return (
    <div className="message-list flex-grow-1 px-4 py-4 d-flex flex-column justify-content-start align-items-start overflow-auto">
      {/* <div className="message-date">DATE</div> */}
      {msgLoading ? (
        <Spinner animation="border" variant="primary" className="msg-loading" />
      ) : (
        selectedConversation &&
        selectedConversation.messages &&
        selectedConversation.messages.map((item, index) => {
          const isLastMessage =
            selectedConversation.messages.length - 1 === index;
          return (
            <MessageComponent
              refprop={isLastMessage ? setRef : null}
              key={index}
              text={item.message}
              fromMe={item.fromMe}
              date={item.date}
              time={item.time}
              recipient={item.recipient}
            />
          );
        })
      )}
    </div>
  );
};

export default ChatBox;
