import React, { useCallback, useState, useEffect } from "react";
import MessageComponent from "./MessageComponent";
import "./chatlistscrollbar.css";
import "./chatcomponent.css";
import { useConversations } from "../../context/ConversationProvider";
import { Spinner } from "react-bootstrap";

function groupByDate(data) {
  return data.reduce((obj, item) => {
    (obj[item.date] = obj[item.date] || []).push(item);
    return obj;
  }, {});
}

const ChatBox = () => {
  const { selectedConversation, msgLoading } = useConversations();
  const [data, setData] = useState({});

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  useEffect(() => {
    let temp = groupByDate(selectedConversation.messages);
    setData(temp);
  }, [selectedConversation]);

  return (
    <div className="message-list flex-grow-1 px-4 py-4 d-flex flex-column justify-content-start align-items-start overflow-auto">
      {/* <div className="message-date">
        {date === new Date().toLocaleDateString() ? "Today" : date}
      </div> */}
      {msgLoading ? (
        <Spinner animation="border" variant="primary" className="msg-loading" />
      ) : (
        Object.keys(data).map((key) => {
          //here key is date
          let messages = data[key];
          return (
            <>
              <div className="message-date">
                {key === new Date().toLocaleDateString() ? "Today" : key}
              </div>
              {messages.map((item, index) => {
                //checking if we are at last message of last date then we have to set the ref
                const isLastMessage =
                  data[Object.keys(data)[Object.keys(data).length - 1]].length -
                    1 ===
                  index;
                return (
                  <MessageComponent
                    refprop={isLastMessage ? setRef : null}
                    key={key + "_" + index}
                    text={item.message}
                    fromMe={item.fromMe}
                    date={item.date}
                    time={item.time}
                    recipient={item.recipient}
                  />
                );
              })}
            </>
          );
        })
      )}
    </div>
  );
};

export default ChatBox;
// selectedConversation &&
// selectedConversation.messages &&
// selectedConversation.messages.map((item, index) => {
//   const isLastMessage =
//     selectedConversation.messages.length - 1 === index;
//   return (
//     <MessageComponent
//       refprop={isLastMessage ? setRef : null}
//       key={index}
//       text={item.message}
//       fromMe={item.fromMe}
//       date={item.date}
//       time={item.time}
//       recipient={item.recipient}
//     />
//   );
// })
