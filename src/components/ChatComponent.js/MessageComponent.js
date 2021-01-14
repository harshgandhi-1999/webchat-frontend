import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const MessageComponent = () => {
  return (
    <div
      className="bg-gray-100 flex flex-row justify-between items-center px-4 py-1"
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
          className="bg-white w-full px-4 py-2 text-black placeholder-gray-500 outline-none rounded-full"
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
