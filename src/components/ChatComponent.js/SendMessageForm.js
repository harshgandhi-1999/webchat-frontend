import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {InputGroup,FormControl,Form,Button} from 'react-bootstrap'
const SendMessageForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-baseline px-2 py-2" style={{backgroundColor: 'var(--very-light-gray)'}}
    >
      <div className="react-emoji">
        <Button variant="none" className="rounded-circle p-0">
          <FontAwesomeIcon
            icon={faSmile}
            color="orange"
            style={{ fontSize: "1.5rem" }}
          />
        </Button>
      </div>
      {/* <div className="message-input flex-grow mx-2">
      </div> */}
      <div className="message-input-form flex-grow-1">
        <Form
          action=""
          onSubmit={handleSubmit}
          className="d-flex flex-row justify-content-between align-items-center ml-2"
        >
          <Form.Group controlId="userMessage" className="w-100 m-0">
            <Form.Control type="text" className="rounded-pill" placeholder="Type message here..." />
          </Form.Group>
          {/* <input
            type="text"
            className="bg-white w-100 text-black outline-none rounded"
            placeholder="Type message here..."
          /> 
          <button className="focus:outline-none ml-2" type="submit">
            <FontAwesomeIcon
              icon={faPaperPlane}
              color="blue"
              style={{ fontSize: "1.5rem" }}
            />
          </button> */}
          <Button type="submit" variant="none" className="rounded-circle p-0 ml-2">
            <FontAwesomeIcon
                icon={faPaperPlane}
                color="blue"
                style={{ fontSize: "1.5rem" }}
              />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SendMessageForm;
