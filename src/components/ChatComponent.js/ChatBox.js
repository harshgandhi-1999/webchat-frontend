import React from "react";
import MessageComponent from "./MessageComponent";
import './chatlistscrollbar.css'

const ChatBox = () => {
  return (
    <div className="message-list flex-grow-1 px-6 py-4 d-flex flex-column justify-content-start align-items-start overflow-y-auto">
      <MessageComponent
        text="hello vvvvvvvvvvvvvvvvvvghhhhhhhhhhhhhhh gvhhhhhhhhhhhhhh etrrrrrrrrrrrrrrrrrrrr"
        fromMe={true}
      />
      <MessageComponent
        text="hello vvvvvvvvvvvvvvvvvvghhhhhhhhhhhhhhh gvhhhhhhhhhhhhhh etrrrrrrrrrrrrrrrrrrr"
        fromMe={false}
      />
      <MessageComponent text="hello" fromMe={true} />
      <MessageComponent text="hi" fromMe={false} />
      <MessageComponent text="hello" fromMe={true} />
      <MessageComponent text="hi" fromMe={false} />
      <MessageComponent text="hello" fromMe={true} />
      <MessageComponent text="hi" fromMe={false} />
      <MessageComponent text="hello" fromMe={true} />
      <MessageComponent text="hi" fromMe={false} />
      <MessageComponent text="hello" fromMe={true} />
      <MessageComponent text="hi" fromMe={false} />
      <MessageComponent text="hello" fromMe={true} />
      <MessageComponent text="hi" fromMe={false} />
      <MessageComponent text="hello" fromMe={true} />
      <MessageComponent text="hi" fromMe={false} />
      <MessageComponent text="hello" fromMe={true} />
      <MessageComponent text="hi" fromMe={false} />
    </div>
  );
};

export default ChatBox;
