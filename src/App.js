import React from "react";
import "./app.css";
import Content from "./components/Content/Content";
import { ContactsProvider } from "./context/ContactProvider";
import { ConversationsProvider } from "./context/ConversationProvider";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";
import AuthScreen from "./components/AuthPage/AuthScreen";
import { ToastContainer, Flip } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <ContactsProvider>
          <ConversationsProvider>
            <React.Fragment>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                draggable
                pauseOnHover
                limit={3}
                pauseOnFocusLoss={false}
                transition={Flip}
              />
              <div className="mobile-screen">
                <h4>
                  This application is not for mobile screen. Please open it on
                  pc.
                </h4>
              </div>
              <div className="App position-relative">
                <Content />
                <AuthScreen />
              </div>
            </React.Fragment>
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
