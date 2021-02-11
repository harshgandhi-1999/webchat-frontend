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
                {/* <div className="absolute text-xl text-blue-700 left-2/4 transform -translate-x-2/4">
          Web Chat
        </div> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#BFDBFE"
            fill-opacity="1"
            d="M0,256L26.7,261.3C53.3,267,107,277,160,282.7C213.3,288,267,288,320,245.3C373.3,203,427,117,480,96C533.3,75,587,117,640,149.3C693.3,181,747,203,800,218.7C853.3,235,907,245,960,208C1013.3,171,1067,85,1120,58.7C1173.3,32,1227,64,1280,96C1333.3,128,1387,160,1413,176L1440,192L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#BFDBFE"
            fill-opacity="1"
            d="M0,128L26.7,149.3C53.3,171,107,213,160,197.3C213.3,181,267,107,320,106.7C373.3,107,427,181,480,213.3C533.3,245,587,235,640,192C693.3,149,747,75,800,85.3C853.3,96,907,192,960,218.7C1013.3,245,1067,203,1120,176C1173.3,149,1227,139,1280,144C1333.3,149,1387,171,1413,181.3L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg> */}
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
