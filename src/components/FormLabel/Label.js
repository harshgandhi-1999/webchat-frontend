import React from "react";
import { Form } from "react-bootstrap";

const RedAsterisk = () => {
  return <span style={{ color: "red" }}>*</span>;
};

const Label = ({ text }) => {
  return (
    <Form.Label style={{ fontWeight: "500" }} className="text-primary">
      {text}
      <RedAsterisk />
    </Form.Label>
  );
};

export default Label;
