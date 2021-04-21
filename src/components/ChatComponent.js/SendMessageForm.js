import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import { useConversations } from "../../context/ConversationProvider";
import { Picker } from "emoji-mart";
import { motion } from "framer-motion";
import "./chatcomponent.css";

const variants = {
  open: { y: "0%", opacity: 1 },
  closed: { y: "100%", opacity: 0 },
};

const SendMessageForm = () => {
  const { sendMessage, selectedConversation } = useConversations();
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      const date = new Date();
      const messageBody = {
        message: e.target.userMessage.value.trim(),
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "numeric",
          minute: "numeric",
        }),
        recipient: selectedConversation.recipient,
      };
      sendMessage(messageBody);
      setText("");
    }
  };

  const handleInputChange = ({ target: { value } }) => setText(value);
  const addEmoji = (e) => {
    let emoji = e.native;
    setText((prevtext) => {
      return prevtext + emoji;
    });
  };

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  return (
    <>
      <motion.div
        style={{ zIndex: "-2" }}
        initial={{ y: "100%" }}
        animate={showEmojiPicker ? "open" : "closed"}
        variants={variants}
      >
        <Picker
          onSelect={addEmoji}
          set="google"
          showPreview={false}
          showSkinTones={false}
          emojiTooltip={true}
          style={{ display: "block" }}
        />
      </motion.div>
      <div
        className="send-message-container"
        style={{ backgroundColor: "var(--very-light-gray)" }}
      >
        <div className="react-emoji">
          <Button
            variant="none"
            className="rounded-circle p-0"
            style={{ width: "24px" }}
            onClick={toggleEmojiPicker}
          >
            {showEmojiPicker ? (
              <FontAwesomeIcon icon={faTimes} style={{ fontSize: "1.5rem" }} />
            ) : (
              <FontAwesomeIcon
                icon={faSmile}
                color="orange"
                style={{ fontSize: "1.5rem" }}
              />
            )}
          </Button>
        </div>
        <div className="message-input-form flex-grow-1">
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-row justify-content-between align-items-center ml-2"
          >
            <Form.Group controlId="userMessage" className="w-100 m-0">
              <Form.Control
                type="text"
                className="rounded-pill"
                placeholder="Type message here..."
                value={text}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="none"
              className="rounded-circle p-0 ml-2"
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                color="blue"
                style={{ fontSize: "1.5rem" }}
              />
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SendMessageForm;
