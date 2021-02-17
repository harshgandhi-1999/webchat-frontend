import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketProvider";

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
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(
    null
  );

  //using contact context and user context
  // const { contacts } = useContacts();
  const { user, isLoggedIn } = useAuth();
  const { socket } = useSocket();

  const formattedConversations = conversations.map((conversation, index) => {
    //for messages
    const messages = conversation.messages.map((message) => {
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

  // console.log(formattedConversations);
  const addMessageToConversation = useCallback(
    (newMessage) => {
      setConversations((prevConversations) => {
        let madeConvoInitially = false;
        const newConversations = prevConversations.map((convo) => {
          if (
            convo.recipient.recipientNo === newMessage.recipient.recipientNo
          ) {
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
    },
    [setConversations]
  );

  const sendMessage = (messageBody) => {
    socket.emit("send-message", messageBody);
    addMessageToConversation({
      ...messageBody,
      sender: { contactNo: user.contactNo },
    });
    setSelectedConversation((prevSelected) => {
      return {
        ...prevSelected,
        messages: [
          ...prevSelected.messages,
          {
            ...messageBody,
            fromMe: true,
            sender: { contactNo: user.contactNo },
          },
        ],
      };
    });
  };

  //effect for not logged in
  useEffect(() => {
    if (isLoggedIn === false) {
      setConversations([]);
      setSelectedConversation(null);
      setSelectedConversationIndex(null);
    }
  }, [
    isLoggedIn,
    setConversations,
    setSelectedConversationIndex,
    setSelectedConversation,
  ]);

  // effect for recieving message
  useEffect(() => {
    if (socket == null) return;

    socket.on("recieve-message", (message) => {
      console.log(message);
      addMessageToConversation(message);
      if (
        selectedConversation &&
        selectedConversation.recipient.recipientNo ===
          message.recipient.recipientNo
      ) {
        setSelectedConversation((prevSelected) => {
          return {
            ...prevSelected,
            messages: [...prevSelected.messages, { ...message, fromMe: false }],
          };
        });
      }
    });

    return () => socket.off("recieve-message");
  }, [socket, addMessageToConversation, selectedConversation]);

  console.log(selectedConversation);
  // console.log(formattedConversations[selectedConversationIndex]);
  useEffect(() => {
    if (selectedConversationIndex !== null) {
      setSelectedConversation(
        formattedConversations[selectedConversationIndex]
      );
    }
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
