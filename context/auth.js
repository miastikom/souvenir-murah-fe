import { createContext, useEffect, useState } from "react";
import api from "../config/axios";
import { getToken } from "../utils";
import { message } from "antd";
import { useRouter } from "next/router";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({ role: "USER", login: false });

  const router = useRouter();

  const restoreUserData = async () => {
    try {
      const { data: resUser } = await api.get("/auth/detail", getToken());
      setUserData({ ...resUser.data, login: true });
    } catch (error) {
      setUserData({ ...userData, login: false });
      console.log(error);
    }
  };

  const login = (payload) => {
    api
      .post("/auth/login", payload)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        setUserData({ ...data.user, login: true });
        message.success("login success");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response.data.message);
      });
  };

  const register = (payload) => {
    api
      .post("/auth/register", payload)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        setUserData({ ...data.user, login: true });
        message.success("register success");
        router.push("/");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const updateUser = (payload) => {
    api
      .put("/auth/update", payload)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        setUserData({ ...data.user, login: true });
        message.success("update success");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData({ role: "USER", login: false });
    message.success("logout success");
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      restoreUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userData, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
