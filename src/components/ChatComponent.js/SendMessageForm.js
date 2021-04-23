import React, { useState, useRef, useEffect } from "react";
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
  open: {
    y: "0%",
    opacity: 1,
    transition: {
      when: "afterChildren",
      ease: "easeOut",
      duration: "0.3",
    },
  },
  closed: {
    y: "100%",
    opacity: 0,
    transition: {
      when: "beforeChildren",
      ease: "easeIn",
      duration: "0.3",
    },
  },
};

const item = {
  open: { display: "block" },
  closed: { display: "none" },
};

const SendMessageForm = () => {
  const { sendMessage, selectedConversation } = useConversations();
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      const date = new Date();
      const messageBody = {
        message: text.trim(),
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
      textRef.current.style.height = "36px";
    }
  };

  const submitOnEnter = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    textRef.current.style.height = "36px";
    textRef.current.style.height = `${e.target.scrollHeight}px`;
    setText(value);
  };
  const addEmoji = (e) => {
    let emoji = e.native;
    setText((prevtext) => {
      return prevtext + emoji;
    });
    textRef.current.focus();
  };

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  useEffect(() => {
    if (showEmojiPicker) {
      textRef.current.focus();
    }
  }, [showEmojiPicker]);

  return (
    <>
      <motion.section
        initial={{ y: "100%", opacity: 0 }}
        animate={showEmojiPicker ? "open" : "closed"}
        variants={variants}
      >
        <motion.section variants={item}>
          <Picker
            onSelect={addEmoji}
            showPreview={false}
            showSkinTones={false}
            style={{ zIndex: 1, display: "inherit" }}
          />
        </motion.section>
      </motion.section>
      <div
        className="send-message-container"
        style={{ backgroundColor: "var(--very-light-gray)", zIndex: 2 }}
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
                as="textarea"
                type="text"
                placeholder="Type message here..."
                style={{
                  resize: "none",
                  backgroundClip: "border-box",
                  minHeight: "36px",
                  maxHeight: "64px",
                }}
                value={text}
                rows={1}
                ref={textRef}
                onKeyPress={submitOnEnter}
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
