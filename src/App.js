import React from "react";
import "./app.css";
import Content from "./components/Content/Content";
import { ContactsProvider } from "./context/ContactContext";
import { ConversationsProvider } from "./context/ConversationContext";
import { AuthProvider } from "./context/AuthContext";
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
