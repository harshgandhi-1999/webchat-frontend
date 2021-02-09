import React, { useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", {});
  useEffect(() => {
    const r = randomNumber(100, 999);
    setUser({ contactNo: r.toString(), name: "Harsh" });
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
}
