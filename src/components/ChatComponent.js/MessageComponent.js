import React from "react";

const MessageComponent = ({ text, fromMe }) => {
  return (
    <div
      className="message-style py-1 px-2 mb-4 rounded"
      style={fromMe ? {
        background: 'var(--primary)',
        alignSelf:"end",
        color: '#fff',
        marginLeft: 'auto',
        maxWidth: '75%'
      } : {
        background: 'var(--chat-gray)',
        alignSelf:"sart",
        color: '#000',
        marginRight: 'auto',
        maxWidth: '75%'
      }}
    >
      <p className="text-break mb-0">{text}</p>
    </div>
  );
};

export default MessageComponent;
// {background: `${fromMe ? "#3B82F6" : "#E5E7EB"}`}