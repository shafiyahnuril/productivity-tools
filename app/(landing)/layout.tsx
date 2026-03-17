import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productivity Tools - Organize Your Life",
  description:
    "Master your productivity with focus timers, note-taking, calendar, and task management.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
