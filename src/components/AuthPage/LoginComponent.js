import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Label from "../FormLabel/Label";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const [validated, setValidated] = useState(false);
  const { setUser } = useAuth();
  const [btnloading, setBtnLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else {
      const phoneNo = event.target.login_phoneNo.value.trim();
      const password = event.target.login_password.value.trim();

      const requestBody = JSON.stringify({
        contact: phoneNo,
        password: password,
      });
      setBtnLoading(true);
      axiosInstance
        .post("/login", requestBody)
        .then((res) => {
          setUser({ ...res.data.userInfo, token: res.data.token });
          toast.success(`${res.data.message}`, {
            toastId: "login_success_toast",
          });

          event.target.login_phoneNo.value = "";
          event.target.login_password.value = "";
          setBtnLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setBtnLoading(false);
          if (err.response) {
            toast.error(`${err.response.data.message}`, {
              toastId: "login_failed_toast",
            });
            // alert(err.response.data.message);
          } else {
            toast.error(`${err.message}`, {
              className: "some_error_toast",
            });
            // alert(err.message);
          }
        });
      setValidated(false);
    }
  };
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="login_phoneNo">
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
        <Form.Group controlId="login_password">
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
        <Button type="submit" variant="success" disabled={btnloading}>
          {btnloading ? (
            <Spinner as="span" animation="border" role="status" />
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;
