import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DatabaseInitializer } from "@/components/DatabaseInitializer";
import { Navigation } from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ramadan Tracker",
  description: "Track your worship activities during Ramadan",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ramadan Tracker",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10b981",
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
        <Navigation />
      </body>
    </html>
  );
}
