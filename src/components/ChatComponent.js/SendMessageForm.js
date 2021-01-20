import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SendMessageForm = () => {
  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <div
      className="bg-gray-100 flex flex-row justify-between items-center px-4 py-2"
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
      {/* <div className="message-input flex-grow mx-2">
      </div> */}
      <div className="message-input-form flex-grow mx-2">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-row justify-between"
        >
          <input
            type="text"
            className="bg-white w-full px-4 py-2 text-black placeholder-gray-500 outline-none rounded-full"
            placeholder="Type message here..."
          />
          <button className="focus:outline-none ml-2" type="submit">
            <FontAwesomeIcon
              icon={faPaperPlane}
              color="blue"
              style={{ fontSize: "1.5rem" }}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessageForm;
