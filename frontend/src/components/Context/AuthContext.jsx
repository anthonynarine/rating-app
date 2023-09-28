import { createContext, useContext, } from "react";
import { useAuthServices } from "../Auth/AuthServices";

const AuthContext = createContext({
  obtainTokens: async () => {},
  getUserIdFromToken: () => {},
  getUserDetials: async () => {}
});


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
