import type { Metadata } from "next";
import { Inter, Geist_Mono, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import ConditionalNav from "./components/ConditionalNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
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
        className={`${inter.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <ConditionalNav>
            {children}
          </ConditionalNav>
        </ThemeProvider>
      </body>
    </html>
  );
}
