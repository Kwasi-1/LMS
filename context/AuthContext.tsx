"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "@/lib/toast";

export type UserRole = "admin" | "teacher" | "student" | "parent";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar:
      "https://ui-avatars.com/api/?name=Admin+User&background=0D8DDC&color=fff",
  },
  {
    id: "2",
    name: "Teacher User",
    email: "teacher@example.com",
    role: "teacher",
    avatar:
      "https://ui-avatars.com/api/?name=Teacher+User&background=10B981&color=fff",
  },
  {
    id: "3",
    name: "Student User",
    email: "student@example.com",
    role: "student",
    avatar:
      "https://ui-avatars.com/api/?name=Student+User&background=F59E0B&color=fff",
  },
  {
    id: "4",
    name: "Parent User",
    email: "parent@example.com",
    role: "parent",
    avatar:
      "https://ui-avatars.com/api/?name=Parent+User&background=7C3AED&color=fff",
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("lms_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, check if the user exists in our mock data
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.role === role
      );

      if (foundUser && password === "password") {
        // Simple password check for demo
        setUser(foundUser);
        localStorage.setItem("lms_user", JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
      } else {
        throw new Error("Invalid credentials or user not found");
      }
    } catch (error) {
      toast.error("Login failed: " + (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if email is already in use
      if (mockUsers.some((u) => u.email === email)) {
        throw new Error("Email already in use");
      }

      // Create new user for demo
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(
          " ",
          "+"
        )}&background=0D8DDC&color=fff`,
      };

      // Update local mockUsers array (this is just for demo)
      mockUsers.push(newUser);

      // Set the new user as current
      setUser(newUser);
      localStorage.setItem("lms_user", JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Signup failed: " + (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("lms_user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if email exists
      const userExists = mockUsers.some((u) => u.email === email);
      if (!userExists) {
        throw new Error("No account found with this email");
      }

      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, we would validate the token and update the password
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error("Password reset failed: " + (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
