import React from "react";
import { Form } from "react-bootstrap";

const Label = ({ text }) => {
  return (
    <Form.Label style={{ fontWeight: "500" }} className="text-primary">
      {text}
    </Form.Label>
  );
};

export default Label;
