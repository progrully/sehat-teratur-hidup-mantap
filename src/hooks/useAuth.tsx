
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

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
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Sample users for demonstration
const initialUsers: User[] = [
  { id: "1", name: "Pasien Demo", email: "pasien@example.com", role: "patient" },
  { id: "2", name: "Perawat Demo", email: "perawat@example.com", role: "nurse" },
  { id: "3", name: "Admin Demo", email: "admin@example.com", role: "admin" },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  
  // Check for stored user and users list on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("imoUser");
    const storedUsers = localStorage.getItem("imoUsers");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with sample users if no stored users
      setUsers(initialUsers);
      localStorage.setItem("imoUsers", JSON.stringify(initialUsers));
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Find user with matching email
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      // Set the current user
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

  // Register function - add new user
  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    // Check if email is already in use
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast.error("Email ini sudah digunakan");
      return false;
    }
    
    // Create new user
    const newUser = {
      id: String(Date.now()),
      name,
      email,
      role,
    };
    
    // Add to users list
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("imoUsers", JSON.stringify(updatedUsers));
    
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        users,
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
