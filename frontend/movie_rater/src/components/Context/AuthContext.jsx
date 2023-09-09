import { createContext, useContext } from "react";
import { useAuthServices } from "../Auth/AuthServices";

const AuthContext = createContext({
  // You can add default values or placeholder functions here, if needed
});

export function AuthProvider({ children }) {
  const authServices = useAuthServices();

  return (
    <AuthContext.Provider value={authServices}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}

export default AuthProvider;  
