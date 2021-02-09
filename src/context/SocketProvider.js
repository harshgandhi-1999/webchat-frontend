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
    const newSocket = io("http://localhost:8000", {
      query: { contactNo: user.contactNo, name: user.name },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [user.contactNo, user.name]);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
}
