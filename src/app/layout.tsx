import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Mayank Sahu | Full Stack Engineer & UI/UX Designer",
  description: "Personal portfolio of Mayank Sahu, a Full Stack Engineer specialized in building exceptional digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
