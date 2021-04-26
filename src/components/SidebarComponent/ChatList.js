import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../context/ConversationProvider";

const ChatList = () => {
  const { conversations, selectConversationIndex } = useConversations();
  const handleSelect = (index, recipient) => {
    selectConversationIndex(index, recipient);
  };

  return (
    <ListGroup style={{ background: "transparent" }}>
      {conversations.map((conversation, index) => {
        return (
          <ListGroup.Item
            className="user-select-none"
            action
            active={conversation.selected}
            key={index}
            onClick={() => handleSelect(index, conversation.recipient)}
          >
            {conversation.recipient.recipientName ||
              conversation.recipient.recipientNo}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ChatList;
