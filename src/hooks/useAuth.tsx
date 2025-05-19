
import React, { createContext, useContext, useState, useEffect } from "react";

// Types for user and roles
type UserRole = "patient" | "nurse" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Sample users for demonstration
const sampleUsers: User[] = [
  { id: "1", name: "Pasien Demo", email: "pasien@example.com", role: "patient" },
  { id: "2", name: "Perawat Demo", email: "perawat@example.com", role: "nurse" },
  { id: "3", name: "Admin Demo", email: "admin@example.com", role: "admin" },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("imoUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function - simulated for now
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call
    // For demo purpose, we'll use our sample users
    const foundUser = sampleUsers.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("imoUser", JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("imoUser");
  };

  // Register function - simulated for now
  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just return true
    // and use the login function
    
    // In a real app you would check if the email is already in use
    const newUser = {
      id: String(sampleUsers.length + 1),
      name,
      email,
      role,
    };
    
    // In a real app, this would be done server-side
    sampleUsers.push(newUser);
    
    // Auto login after registration
    setUser(newUser);
    localStorage.setItem("imoUser", JSON.stringify(newUser));
    
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
