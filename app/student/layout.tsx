import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student portal",
  description: "Lerning Management System",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="p-6">{children}</main>;
}
