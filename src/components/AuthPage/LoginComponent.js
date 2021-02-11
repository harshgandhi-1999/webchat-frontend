import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Label from "../FormLabel/Label";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

const LoginComponent = () => {
  const [validated, setValidated] = useState(false);
  const { setUser } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else {
      const phoneNo = event.target.phoneNo.value.trim();
      const password = event.target.password.value.trim();

      const requestBody = JSON.stringify({
        contact: phoneNo,
        password: password,
      });

      axiosInstance
        .post("/login", requestBody)
        .then((res) => {
          setUser({ ...res.data.userInfo, token: res.data.token });

          event.target.phoneNo.value = "";
          event.target.password.value = "";
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            alert(err.response.data.message);
          } else {
            alert(err.message);
          }
        });
      setValidated(false);
    }
  };
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="phoneNo">
          <Label text="Phone no." />
          <Form.Control
            type="text"
            placeholder="Enter your phone no."
            required
            pattern="^[6-9][0-9]{9}"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid phone no.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Label text="Password" />
          <Form.Control
            type="password"
            placeholder="Enter your password"
            required
            pattern="^\d{3}$"
          />
          <Form.Text id="passwordHelpText" muted>
            Your password must be a 3 digit number
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid password
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="success">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;
