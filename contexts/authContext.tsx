"use client";

import { useState, createContext, useContext } from "react";

type authContextType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const authContext = createContext<authContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <authContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => useContext(authContext);
