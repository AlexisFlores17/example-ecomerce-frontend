import { createContext } from "react";

const AuthContext = createContext({
  auht: undefined,
  login: () => {
    return null;
  },
  logout: () => {
    return null;
  },
  setReloadUser: () => {
    return null;
  },
});

export default AuthContext;
