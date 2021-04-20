import React from "react";

const MessageComponent = ({ refprop, text, fromMe, date, time, recipient }) => {
  return (
    <div
      ref={refprop}
      className="message-style py-1 px-2 mb-2 rounded"
      style={
        fromMe
          ? {
              background: "var(--primary)",
              alignSelf: "end",
              color: "#fff",
              marginLeft: "auto",
              maxWidth: "75%",
            }
          : {
              background: "var(--chat-gray)",
              alignSelf: "sart",
              color: "#000",
              marginRight: "auto",
              maxWidth: "75%",
            }
      }
    >
      {/* <div className="sender-name font-weight-bolder">
        {fromMe ? "You" : recipient.recipientName || recipient.recipientNo}
      </div> */}
      <p
        className="message text-break mb-0"
        // style={
        //   fromMe
        //     ? {
        //         background: "var(--primary-dark)",
        //       }
        //     : {
        //         background: "var(--primary-dark)",
        //       }
        // }
      >
        {text}
      </p>
      <div
        className="message-time"
        style={{
          fontSize: "0.8rem",
          float: "right",
        }}
      >
        {time}
      </div>
    </div>
  );
};

export default MessageComponent;
// {background: `${fromMe ? "#3B82F6" : "#E5E7EB"}`}
