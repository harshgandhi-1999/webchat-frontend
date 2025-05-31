import { AuthProvider } from "./context/AuthProvider";
import { ContactsProvider } from "./context/ContactProvider";
import { ConversationsProvider } from "./context/ConversationProvider";
import { SocketProvider } from "./context/SocketProvider";
import "./App.css";
import AuthScreen from "./components/AuthPage/AuthScreen";
import Content from "./components/Content/Content";
import { Flip, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
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

      <AuthProvider>
        <SocketProvider>
          <ContactsProvider>
            <ConversationsProvider>
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
            </ConversationsProvider>
          </ContactsProvider>
        </SocketProvider>
      </AuthProvider>
    </>
  );
}

export default App;
