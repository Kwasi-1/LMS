"use client";

// import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import AppSidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isLanding = pathname === "/";
  const isLogin = pathname === "/login";

  const isRegister = pathname === "/register";
  const isForgotPassword = pathname === "/forgot-password";
  const isResetPassword = pathname === "/reset-password/[token]";

  const NoSidebar =
    isLanding || isLogin || isRegister || isForgotPassword || isResetPassword;

  return (
    <SidebarProvider defaultOpen={true}>
      <main className="flex min-h-screen w-full bg-background">
        {!NoSidebar && <AppSidebar />}
        <div className="flex-1 overflow-hidden">
          {!NoSidebar && <Navbar />}
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
export default LayoutWrapper;
