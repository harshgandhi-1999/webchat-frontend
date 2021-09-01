import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    if (isLoggedIn === true) {
      const newSocket = io("https://webchatbackend.herokuapp.com/", {
        query: { contactNo: user.contactNo, username: user.username },
        extraHeaders: { Authorization: `Bearer ${user.token}` },
        transports: ["polling", "websocket"],
      });

      newSocket.on("unauthorized", (error, callback) => {
        if (
          error.data.type === "UnauthorizedError" ||
          error.data.code === "invalid_token"
        ) {
          // redirect user to login page perhaps?
          callback();
          logout();
          console.log("User token has expired");
        }
      });

      setSocket(newSocket);
      return () => newSocket.close();
    } else {
      setSocket(null);
    }
  }, [user, isLoggedIn]);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
}
// https://webchatbackend.herokuapp.com/
