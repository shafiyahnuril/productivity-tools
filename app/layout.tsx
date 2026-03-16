import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import BottomNavigation from "./components/BottomNavigation";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Productivity App",
  description: "Manage your tasks, notes, and study time efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-paper-bg text-paper-fg`}>
        <ThemeProvider>
          <Sidebar />
          <BottomNavigation />
          <main className="md:ml-24 min-h-screen p-4 md:p-8 pb-24 md:pb-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
