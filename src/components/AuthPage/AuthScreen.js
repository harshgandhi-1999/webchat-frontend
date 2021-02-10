import React from "react";
import "./authscreen.css";
import { Card, Tabs, Tab } from "react-bootstrap";
// import blob1 from "../../assets/blob.svg";
// import { motion } from "framer-motion";

const AuthScreen = () => {
  return (
    <div className="auth-screen">
      <div className="app-heading">
        <h2>WEBCHAT</h2>
      </div>
      <Card>
        <Card.Body style={{ padding: "0px" }}>
          <Tabs defaultActiveKey="login" id="auth-tabs">
            <Tab eventKey="login" title="Login">
              login
            </Tab>
            <Tab eventKey="signup" title="Signup">
              signup
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
      {/* <img src={blob1} alt="" className="blob" /> */}
    </div>
  );
};

export default AuthScreen;
