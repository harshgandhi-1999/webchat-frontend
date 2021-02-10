import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  const { user } = useAuth();

  useEffect(() => {
    if (Object.keys(user).length !== 0 && user !== null) {
      const newSocket = io("http://localhost:8000", {
        query: { contactNo: user.contactNo, name: user.username },
      });
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
}
