import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import BottomNavigation from "./components/BottomNavigation";
import MobileHeader from "./components/MobileHeader";
import FloatingThemeToggle from "./components/FloatingThemeToggle";
import FloatingAddButton from "./components/FloatingAddButton";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <head>
        {/* Anti-flash: sets .dark class before first paint to prevent flicker */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('paper-os-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <MobileHeader />
          <Sidebar />
          <BottomNavigation />
          <FloatingThemeToggle />
          <FloatingAddButton />
          <main className="md:ml-24 min-h-screen p-4 pt-20 md:pt-8 md:p-8 pb-32 md:pb-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
