import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthProvider";
import { useSocket } from "./SocketProvider";
import { useContacts } from "./ContactProvider";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";
import { encryptData, decryptData } from "../e2e/aes";

const ConversationsContext = React.createContext({
  conversations: {},
  createConversation: () => {},
  sendMessage: () => {},
  selectedConversation: {},
  selectConversationKey: () => {},
  setSelectedConversation: () => {},
  updateNameInConversation: () => {},
  msgLoading: Boolean,
  setMsgLoading: () => {},
});

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    {}
  );
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConversationKey, setSelectedConversationKey] = useState(null);
  const [msgLoading, setMsgLoading] = useState(false);

  //using contact context and user context
  const { contacts } = useContacts();
  const { user, logout, isLoggedIn } = useAuth();
  const { socket } = useSocket();

  const formattedConversations = Object.keys(conversations)
    .map((key) => {
      let value = conversations[key];
      const messages = value.messages.map((message) => {
        let fromMe = user.contactNo === message.sender.contactNo;
        return { ...message, fromMe };
      });

      const selected = selectedConversationKey === key;

      return { [key]: { ...value, messages: messages, selected: selected } };
    })
    .reduce(convertToObject, {});

  const createConversation = (recipient, cb) => {
    //create new convo post request
    const requestBody = {
      contactNo: recipient.recipientNo,
      name: recipient.recipientName,
    };
    axiosInstance
      .post(`/createnew/${user.userId}`, requestBody, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setConversations((prevConvo) => {
          return {
            ...prevConvo,
            [recipient.recipientNo]: { recipient: recipient, messages: [] },
          };
        });

        cb();
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          logout();
        } else {
          toast.error(
            "Failed to create new conversation.Some error occured..."
          );
        }
      });
  };

  const addMessageToConversation = useCallback(
    (newMessage) => {
      setConversations((prevConversations) => {
        const key = newMessage.recipient.recipientNo;
        const prevConvo = prevConversations[key];

        //if made convo initiallly
        if (key in prevConversations) {
          return {
            ...prevConversations,
            [key]: {
              ...prevConvo,
              messages: [...prevConvo.messages, newMessage],
            },
          };
        } else {
          //when new message is recieved then it will run to create new conversation in database
          const requestBody = {
            contactNo: newMessage.recipient.recipientNo,
            name: newMessage.recipient.recipientName,
          };
          axiosInstance
            .post(`/createnew/${user.userId}`, requestBody, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then(() => {})
            .catch((err) => {
              console.log(err);
              if (err.response && err.response.status === 401) {
                logout();
              } else {
                toast.error(
                  "Failed to create new conversation.Some error occured..."
                );
              }
            });
          return {
            ...prevConversations,
            [key]: { recipient: newMessage.recipient, messages: [newMessage] },
          };
        }
      });
    },
    [user]
  );

  const sendMessage = (messageBody) => {
    // ENCRYPTING MESSAGE BODY
    let encryptedMessage = encryptData(messageBody);
    socket.emit("send-message", encryptedMessage);
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

  const updateNameInConversation = (number, name, updatedMessages) => {
    //updating name in chat list
    axiosInstance
      .put(
        `/chatlist/${user.userId}`,
        {
          contactNo: number,
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setConversations((prevConvo) => {
          return {
            ...prevConvo,
            [number]: {
              ...prevConvo[number],
              recipient: {
                ...prevConvo[number].recipient,
                recipientName: name,
              },
              messages: updatedMessages,
            },
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //for selecting a particular chat from list
  const setIndex = async (key) => {
    //here key is the recipientNo
    if (selectedConversationKey !== key) {
      const recipientNo = key;
      const senderNo = user.contactNo;
      setSelectedConversationKey(key);
      setMsgLoading(true);

      // fetch conversation
      try {
        const result = await axiosInstance.get(`/getconvo/${user.userId}/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            participants: [senderNo, recipientNo],
          },
        });

        const allMessages = await result.data.allMessages.map((item) => {
          return {
            message: item.message,
            date: item.date,
            time: item.time,
            sender: { contactNo: item.sender },
            recipient: conversations[key].recipient,
          };
        });
        setConversations((allConvo) => {
          return {
            ...allConvo,
            [recipientNo]: { ...allConvo[recipientNo], messages: allMessages },
          };
        });
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          logout();
        } else {
          toast.error("Failed to load conversations.Some error occured...");
        }
      }
      setMsgLoading(false);
    }
  };

  //effect for not logged in
  useEffect(() => {
    if (
      Object.keys(user).length === 0 ||
      user === null ||
      user.token === null ||
      user.token === ""
    ) {
      setConversations([]);
      setSelectedConversation(null);
      setSelectedConversationKey(null);
    }
  }, [
    user,
    setConversations,
    setSelectedConversationKey,
    setSelectedConversation,
  ]);

  useEffect(() => {
    if (selectedConversationKey !== null) {
      setSelectedConversation(formattedConversations[selectedConversationKey]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationKey, conversations]);

  //effect for fetching chat list
  useEffect(() => {
    if (isLoggedIn) {
      axiosInstance
        .get(`/chatlist/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          //converting to object
          let result = res.data.chatList.reduce(
            (obj, item) => ({ ...obj, [item.recipient.recipientNo]: item }),
            {}
          );
          setConversations(result);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            logout();
          } else {
            toast.error("Some error occured. Please reload...");
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, setConversations, isLoggedIn]);

  // effect for recieving message
  useEffect(() => {
    if (socket == null) return;

    socket.on("recieve-message", async (messageBody) => {
      // const date = new Date();
      // DECRYPTING MESSAGE BODY
      let message = decryptData(messageBody);
      let newMessage = {
        ...message,
        //TODO://remove bug of sending time and receving time
      };

      //then update message
      if (message.recipient.recipientNo in contacts) {
        newMessage = {
          ...newMessage,
          recipient: {
            ...message.recipient,
            recipientName: contacts[message.recipient.recipientNo].name,
          },
        };
      }
      addMessageToConversation(newMessage);
      if (
        selectedConversation &&
        selectedConversation.recipient.recipientNo ===
          newMessage.recipient.recipientNo
      ) {
        setSelectedConversation((prevSelected) => {
          return {
            ...prevSelected,
            messages: [
              ...prevSelected.messages,
              { ...newMessage, fromMe: false },
            ],
          };
        });
      }
    });

    return () => socket.off("recieve-message");
  }, [socket, addMessageToConversation, selectedConversation, contacts]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversation,
        updateNameInConversation,
        sendMessage,
        selectedConversation,
        setSelectedConversation,
        selectConversationKey: setIndex,
        msgLoading,
        setMsgLoading,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

const convertToObject = (obj, item) => {
  const key = Object.keys(item)[0];
  return { ...obj, [key]: item[key] };
};
