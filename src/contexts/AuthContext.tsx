import { createContext, type ReactNode, useCallback, useState } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, token: string, rememberMe: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext | null>(null);

function getStoredToken() {
  return localStorage.getItem("token") ?? sessionStorage.getItem("token");
}

function setStoredToken(token: string | null, rememberMe: boolean) {
  if (token) {
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
  } else {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  const logout = useCallback(() => {
    setStoredToken(null, false);
    setToken(null);
    setIsAuthenticated(false);

    // Redirect to the login page
    window.location.href = "/login";
  }, []);

  const login = useCallback(
    (username: string, token: string, rememberMe: boolean) => {
      localStorage.setItem("username", username);
      setStoredToken(token, rememberMe);
      setToken(token);
      setIsAuthenticated(true);
    },
    []
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
