import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const createConversation = (recipientNo) => {
    setConversations((prevConvo) => {
      return [...prevConvo, { recipientNo: recipientNo, messages: [] }];
    });
  };

  const addMessageToConversation = ({
    recipientNo,
    message,
    timestamp,
    fromMe,
    sender,
  }) => {
    setConversations((prevConversations) => {
      let madeConvoInitially = false;
      const newMessage = {
        message,
        timestamp,
        fromMe,
        sender,
      };
      const newConversations = prevConversations.map((convo) => {
        if (convo.recipientNo === recipientNo) {
          madeConvoInitially = true;
          return { ...convo, messages: [...convo.messages, newMessage] };
        }

        return convo;
      });

      if (madeConvoInitially) {
        return newConversations;
      } else {
        return [
          ...prevConversations,
          { recipientNo: recipientNo, messages: [newMessage] },
        ];
      }
    });
  };

  const sendMessage = (recipientNo, message, timestamp, fromMe) => {
    addMessageToConversation({
      recipientNo,
      message,
      timestamp,
      fromMe,
      sender: "1234567890",
    });
  };

  return (
    <ConversationsContext.Provider
      value={{ conversations, createConversation, sendMessage }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
