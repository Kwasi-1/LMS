"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "@/lib/toast";
import { BackendUrl } from "@/lib/utils";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "teacher" | "student" | "parent";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
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
    role: UserRole,
    terms: boolean
  ) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
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

  const navigateUser = (role: string) => {
    switch (role) {
      case "teacher":
        router.push("/teacher/dashboard");
        break;
      case "student":
        router.push("/student/dashboard");
        break;
      case "parent":
        router.push("/parent/dashboard");
        break;
      case "admin":
        router.push("/admin/dashboard");
        break;
      default:
        router.push("/");
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    api
      .post(`${BackendUrl}/login`, { email, password, role })
      .then((res) => {
        const userData: User = res.data.data.userInfo;
        setUser(userData);
        localStorage.setItem("lms_user", JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name}!`);
        navigateUser(role);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    terms: boolean
  ) => {
    setIsLoading(true);
    api
      .post(`${BackendUrl}/register`, { name, email, password, role, terms })
      .then((res) => {
        const newUser: User = res.data.data;

        setUser(newUser);
        localStorage.setItem("lms_user", JSON.stringify(newUser));
        toast.success("Account created successfully!");
        navigateUser(role);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  };

  const logout = () => {
    api
      .post(`${BackendUrl}/logout`)
      .then(() => {
        localStorage.removeItem("lms_user");
        setUser(null);
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    api
      .post(`${BackendUrl}/forgot-password`, { email })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    api
      .post(`${BackendUrl}/reset-password`, { token, password })
      .then(() => {
        toast.success("Password reset successfully!");
      })
      .catch((error) => toast.error(error.response.data.message));
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
