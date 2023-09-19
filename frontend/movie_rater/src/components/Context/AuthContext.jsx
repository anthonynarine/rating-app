import { createContext, useContext, useState } from "react";
import { useAuthServices } from "../Auth/AuthServices";

const AuthContext = createContext({
  // You can add default values or placeholder functions here, if needed
  // isLoggedIn: false,
  // setIsLoggedIn: () => {}
});

console.log("AuthContext initialized");

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}

export function AuthProvider({ children }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("AuthProvider rendered");
  const authServices = useAuthServices();

  return (
    <AuthContext.Provider value={authServices}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;  
