import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DatabaseInitializer } from "@/components/DatabaseInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ramadan Tracker",
  description: "Track your worship activities during Ramadan",
  themeColor: "#10b981",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ramadan Tracker",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <DatabaseInitializer />
        {children}
      </body>
    </html>
  );
}
