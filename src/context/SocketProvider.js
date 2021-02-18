import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (isLoggedIn === true) {
      const newSocket = io("http://localhost:8000", {
        query: { contactNo: user.contactNo, username: user.username },
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
