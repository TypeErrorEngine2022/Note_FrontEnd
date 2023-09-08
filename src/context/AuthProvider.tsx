import axios from "axios";
import React, { PropsWithChildren, createContext, useState } from "react";
import { useNavigate } from "react-router";

export class User {
  name: string;
}

export type AuthContextType = {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  signin: (data: { userName: string; password: string }) => Promise<void>;
  signout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
  signin: async (data: { userName: string; password: string }) =>
    new Promise<void>(() => {
      console.log(data);
    }),
  signout: () => new Promise<void>(() => {}),
});

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [user, setUser] = useState<User | null | undefined>();
  const navigate = useNavigate();

  const signin = async (data: { userName: string; password: string }) => {
    try {
      await axios.post("https://localhost:3333/auth/signin", data, {
        withCredentials: true,
      });
      setUser(() => ({
        name: data.userName,
      }));
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const signout = async () => {
    try {
      await axios.get("https://localhost:3333/auth/signout", {
        withCredentials: true,
      });
      setUser(() => null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
