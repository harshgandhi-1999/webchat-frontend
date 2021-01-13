import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const MessageComponent = () => {
  return (
    <div
      className="border-black border-2 bg-gray-100 flex flex-row justify-between items-center p-2"
      style={{ height: "10%" }}
    >
      <div className="react-emoji">
        <button className="focus:outline-none">
          <FontAwesomeIcon
            icon={faSmile}
            color="orange"
            style={{ fontSize: "1.5rem" }}
          />
        </button>
      </div>
      <div className="message-input flex-grow mx-2">
        <input
          type="text"
          className="bg-transparent w-full p-1 text-gray-500 placeholder-gray-500 outline-none rounded-sm"
          placeholder="Type message here..."
        />
      </div>
      <div className="send-btn">
        <button className="focus:outline-none">
          <FontAwesomeIcon
            icon={faPaperPlane}
            color="blue"
            style={{ fontSize: "1.5rem" }}
          />
        </button>
      </div>
    </div>
  );
};

export default MessageComponent;
