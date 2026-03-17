"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";
import MobileHeader from "./MobileHeader";
import FloatingThemeToggle from "./FloatingThemeToggle";
import FloatingAddButton from "./FloatingAddButton";

export default function ConditionalNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <>
      <MobileHeader />
      <Sidebar />
      <BottomNavigation />
      <FloatingThemeToggle />
      <FloatingAddButton />
      <main className="md:ml-24 min-h-screen p-4 pt-20 md:pt-8 md:p-8 pb-32 md:pb-8">
        {children}
      </main>
    </>
  );
}
