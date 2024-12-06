'use client'

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Search } from "@/components/search";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
