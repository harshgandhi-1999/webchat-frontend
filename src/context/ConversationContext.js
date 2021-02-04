import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";
// import { useContacts } from "./ContactContext";

const ConversationsContext = React.createContext({
  conversations: [],
  createConversation: (recipientNo) => {},
  sendMessage: (recipientNo, message, timestamp, fromMe) => {},
  selectedConversation: {},
  selectConversationIndex: () => {},
});

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversation, setSelectedConversation] = useState({});
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(
    null
  );

  //using contact context and user context
  // const { contacts } = useContacts();
  const { user } = useAuth();

  const formattedConversations = conversations.map((conversation, index) => {
    //for messages
    const messages = conversation.messages.map((message) => {
      // const contact = contacts.find((c) => {
      //   return c.contactNo === message.sender.contactNo;
      // });
      // const name = (contact && contact.name) || message.sender.contactNo;
      const fromMe = user.contactNo === message.sender.contactNo;
      return { ...message, fromMe };
    });
    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, selected };
  });

  const createConversation = (recipient, cb) => {
    setConversations((prevConvo) => {
      return [...prevConvo, { recipient: recipient, messages: [] }];
    });
    cb();
  };

  console.log(formattedConversations);
  const addMessageToConversation = (newMessage) => {
    setConversations((prevConversations) => {
      let madeConvoInitially = false;
      const newConversations = prevConversations.map((convo) => {
        if (convo.recipient.recipientNo === newMessage.recipient.recipientNo) {
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
          { recipient: newMessage.recipient, messages: [newMessage] },
        ];
      }
    });
  };

  const sendMessage = (messageBody) => {
    addMessageToConversation({ ...messageBody, sender: user });
    setSelectedConversation((prevSelected) => {
      return {
        ...prevSelected,
        messages: [...prevSelected.messages, { ...messageBody, sender: user }],
      };
    });
  };

  console.log(selectedConversation);
  useEffect(() => {
    setSelectedConversation(formattedConversations[selectedConversationIndex]);
  }, [selectedConversationIndex]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversation,
        sendMessage,
        selectedConversation: selectedConversation,
        setSelectedConversation: setSelectedConversation,
        selectConversationIndex: setSelectedConversationIndex,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
