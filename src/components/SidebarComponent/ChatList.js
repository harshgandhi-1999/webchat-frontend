import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../context/ConversationContext";

const ChatList = () => {
  const { conversations, selectConversationIndex } = useConversations();
  console.log(conversations);
  return (
    <ListGroup style={{ background: "transparent" }}>
      {conversations.map((conversation, index) => {
        return (
          <ListGroup.Item
            className="user-select-none"
            action
            active={conversation.selected}
            key={index}
            onClick={() => selectConversationIndex(index)}
          >
            {conversation.recipient.recipientName}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ChatList;
