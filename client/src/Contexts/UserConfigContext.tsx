import { createContext, ReactNode, useEffect, useState } from "react";
import userServices from "../services/UserServices";

export type UserConfigType = {
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string>> | any;
};

export const UserContext = createContext<UserConfigType>({
  username: "",
  setUsername: () => {},
});

type UserConfigProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserConfigProps) => {
  const [username, setUsername] = useState<string>("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
