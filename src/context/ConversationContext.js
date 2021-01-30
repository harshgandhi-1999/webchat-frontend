import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactContext";

const ConversationsContext = React.createContext({
  conversations: [],
  createConversation: (recipientNo) => {},
  sendMessage: (recipientNo, message, timestamp, fromMe) => {},
  selectedConversation: {},
  selectConversationIndex: () => {},
  showConvo: {},
  setShowConvo: () => {},
});

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ userNo, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [showConvo, setShowConvo] = useState(null);

  const { contacts } = useContacts();

  const formattedConversations = conversations.map((conversation, index) => {
    //for recipient
    const contact = contacts.find((c) => {
      return c.contactNo === conversation.recipientNo;
    });

    console.log("contact = ", contact);
    const recipientName = (contact && contact.name) || conversation.recipientNo;
    const recipient = { recipientNo: conversation.recipientNo, recipientName };

    //for messages
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((c) => {
        return c.contactNo === message.sender;
      });
      const name = (contact && contact.contactNo) || message.sender;
      const fromMe = userNo === message.sender;
      return { ...message, senderName: name, fromMe };
    });
    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipient, selected };
  });

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
      sender: userNo,
    });
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversation,
        sendMessage,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        showConvo: showConvo,
        setShowConvo: setShowConvo,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
