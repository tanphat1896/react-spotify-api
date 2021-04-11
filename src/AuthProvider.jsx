import React, { useState } from "react";

export const authContext = React.createContext({
  token: null,
  setToken: () => {},
});

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  return <authContext.Provider value={{ token, setToken }}>{children}</authContext.Provider>;
}

export default AuthProvider;
