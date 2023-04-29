import React, { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/auth";

type AuthContextType = {
  user: firebase.User | null | undefined;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const [authUser, setAuthUser] = useState<AuthContextType>({
    user,
    loading: true,
  });

  useEffect(() => {
    setAuthUser({ user, loading });
  }, [user, loading]);

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
