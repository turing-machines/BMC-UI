import { useNavigate } from "@tanstack/react-router";
import React, { createContext, type ReactNode, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: () => {
    console.warn("no auth provider");
  },
  logout: () => {
    console.warn("no auth provider");
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") || !!sessionStorage.getItem("token")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") ?? sessionStorage.getItem("token")
  );

  const login = (token: string, rememberMe: boolean) => {
    setIsAuthenticated(true);
    setToken(token);

    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    void navigate({ to: "/login" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
