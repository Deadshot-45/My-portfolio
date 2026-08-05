import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { Plus_Jakarta_Sans, Orbitron } from "next/font/google";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mayank Sahu | Full Stack Engineer & UI/UX Designer",
  description:
    "Personal portfolio of Mayank Sahu, a Full Stack Engineer specialized in building exceptional digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased dark ${sans.variable} ${display.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* Film-grain texture overlay */}
        <div className="noise-overlay" />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
