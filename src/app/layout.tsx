"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components";
import { useEffect } from "react";
import { useVehicleStore } from "@/state";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchVehicles } = useVehicleStore((state) => state);

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <div className="flex flex-col h-screen w-screen">
          <Navbar />
          <div className="flex-1 h-full w-full overflow-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
