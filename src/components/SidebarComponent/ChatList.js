import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../context/ConversationProvider";

const ChatList = () => {
  const { conversations, selectConversationKey } = useConversations();
  // const handleSelect = (index, recipient) => {
  //   selectConversationIndex(index, recipient);
  // };
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
      {/* {conversations.map((conversation, index) => {
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
      })} */}
    </ListGroup>
  );
};

export default ChatList;
