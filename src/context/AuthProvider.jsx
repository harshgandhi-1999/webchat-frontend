import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", {});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success("Logout Successfull");
    setUser({});
  };

  useEffect(() => {
    if (
      Object.keys(user).length !== 0 &&
      user !== null &&
      (user.token !== null || user.token !== "")
    ) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        logout: logout,
        isLoggedIn: isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
