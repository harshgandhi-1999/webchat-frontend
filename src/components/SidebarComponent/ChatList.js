import React from "react";
import { ListGroup } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { useConversations } from "../../context/ConversationProvider";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";

const ChatList = () => {
  const {
    conversations,
    selectConversationIndex,
    setConversations,
  } = useConversations();
  const { user, logout } = useAuth();
  const handleSelect = (index) => {
    const recipientNo = conversations[index].recipient.recipientNo;
    const senderNo = user.contactNo;
    axiosInstance
      .get(`/getconvo/${user.userId}/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          participants: [senderNo, recipientNo],
        },
      })
      .then((res) => {
        const allMessages = res.data.allMessages.map((item) => {
          return {
            message: item.message,
            date: item.date,
            time: item.time,
            sender: { contactNo: senderNo },
            recipient: conversations[index].recipient,
          };
        });
        setConversations((allConvo) => {
          return allConvo.map((convo) => {
            if (convo.recipient.recipientNo === recipientNo) {
              return { ...convo, messages: allMessages };
            }
            return convo;
          });
        });
        selectConversationIndex(index);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          logout();
        }

        toast.error("Failed to load conversations.Some error occured...");
      });
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
            onClick={() => handleSelect(index)}
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
