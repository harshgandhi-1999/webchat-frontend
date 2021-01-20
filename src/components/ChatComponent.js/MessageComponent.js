import React from "react";

const MessageComponent = ({ text, fromMe }) => {
  return (
    <div
      className={`message-style py-1 px-2 mb-4 rounded max-w-xs ${
        fromMe
          ? "self-end text-white bg-blue-500 ml-auto"
          : "self-start text-black bg-gray-200 mr-auto"
      }`}
    >
      <p className="break-all">{text}</p>
    </div>
  );
};

export default MessageComponent;
