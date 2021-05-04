import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../context/ConversationProvider";

const ChatList = () => {
  const { conversations, selectConversationKey } = useConversations();
  const handleSelect = (key) => {
    selectConversationKey(key);
  };

  return (
    <ListGroup style={{ background: "transparent" }}>
      {Object.keys(conversations).map((key) => {
        const convo = conversations[key];
        return (
          <ListGroup.Item
            className="user-select-none"
            action
            active={convo.selected}
            key={key}
            onClick={() => handleSelect(key)}
          >
            {convo.recipient.recipientName || convo.recipient.recipientNo}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ChatList;
