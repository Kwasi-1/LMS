"use client";

import Link from "next/link";
import { useAuth, UserRole } from "@/context/AuthContext";
import {
  Bell,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "../ui/sidebar";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const getRoleDashboard = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "teacher":
        return "/teacher/dashboard";
      case "student":
        return "/student/dashboard";
      case "parent":
        return "/parent/dashboard";
      default:
        return "/";
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {isAuthenticated && (
              <SidebarTrigger className="block lg:hidden mr-2">
                <Menu className="h-6 w-6" />
              </SidebarTrigger>
            )}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary-600 font-bold text-xl">
                LumenLMS
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-gray-500"
                >
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-gray-500"
                    >
                      <Bell size={20} />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h5 className="font-medium">Notifications</h5>
                      <Badge variant="outline">3 New</Badge>
                    </div>
                    <div className="py-2 max-h-[300px] overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 transition">
                        <p className="text-sm font-medium">
                          New assignment posted
                        </p>
                        <p className="text-xs text-gray-500">10 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 transition">
                        <p className="text-sm font-medium">
                          Your submission was graded
                        </p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 transition">
                        <p className="text-sm font-medium">
                          New announcement from Math 101
                        </p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                    <div className="p-2 border-t text-center">
                      <Link
                        href="/notifications"
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-gray-500"
                    >
                      <MessageSquare size={20} />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h5 className="font-medium">Messages</h5>
                      <Badge variant="outline">2 New</Badge>
                    </div>
                    <div className="py-2 max-h-[300px] overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 transition">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Teacher+User&background=10B981&color=fff" />
                            <AvatarFallback>TU</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Teacher User</p>
                            <p className="text-xs text-gray-500 truncate">
                              Question about your assignment...
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 transition">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Admin+User&background=0D8DDC&color=fff" />
                            <AvatarFallback>AU</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">
                              New system update notification...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t text-center">
                      <Link
                        href="/messages"
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        View all messages
                      </Link>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative flex items-center gap-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-block text-sm font-medium">
                        {user?.name}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2 text-center border-b">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <Badge className="mt-1 capitalize">{user?.role}</Badge>
                    </div>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(getRoleDashboard(user?.role as UserRole))
                      }
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
