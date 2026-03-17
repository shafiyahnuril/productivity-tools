import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Productivity Tools",
  description: "Manage your tasks, notes, and study time efficiently.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
