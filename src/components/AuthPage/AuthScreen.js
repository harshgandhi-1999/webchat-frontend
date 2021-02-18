import React from "react";
import "./authscreen.css";
import { Card, Tabs, Tab } from "react-bootstrap";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import "./authscreen.css";
import { useAuth } from "../../context/AuthProvider";
// import blob1 from "../../assets/blob.svg";
// import { motion } from "framer-motion";

const AuthScreen = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return (
      <div className="auth-screen">
        <div className="app-heading">
          <h2>WEBCHAT</h2>
        </div>
        <Card>
          <Card.Body style={{ padding: "0px" }}>
            <Tabs defaultActiveKey="login" id="auth-tabs">
              <Tab eventKey="login" title="LOGIN">
                <LoginComponent />
              </Tab>
              <Tab eventKey="signup" title="SIGNUP">
                <SignupComponent />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
        {/* <img src={blob1} alt="" className="blob" /> */}
      </div>
    );
  } else {
    return <></>;
  }
};

export default AuthScreen;
