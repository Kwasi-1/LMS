"use client";

// import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import AppSidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

// export const metadata: Metadata = {
//   title: "Student portal",
//   description: "Lerning Management System",
//   icons: {
//     icon: "/Datasol_logo.png",
//     shortcut: "/Datasol_logo.png",
//   },
// };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <main className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 overflow-hidden">
          <Navbar />
          <div className="p-6">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
