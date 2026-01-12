import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setuser] = useState(
    JSON.parse(sessionStorage.getItem("userData")) || ""
  );

  const [isLogin, setIsLogin] = useState(!!user);

  const [isRecruiter, setIsRecruiter] = useState(user?.role === "recruiter");

  useEffect(() => {
    // if (user) {
    //   setIsLogin(true);
    // } else {
    //   setIsLogin(false);
    // }

    setIsLogin(!!user);
    setIsRecruiter(user?.role === "recruiter");
  }, [user]);

  const value = {
    user,
    setuser,
    isLogin,
    setIsLogin,
    isRecruiter,
    setIsRecruiter,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
