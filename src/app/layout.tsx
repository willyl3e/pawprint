"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}
          <Analytics></Analytics>
        </SessionProvider>
        <footer className="bg-blue-50 border-t-blue-300 border-t pt-[4.5%] pl-[20%] pr-[20%] pb-[3.5%] adminFooter max-xl:ml-[5%] max-xl:mr-[5%]">
          <div className="grid grid-cols-2">
            <span className="block WorkSans text-[.7em] leading-[1em] text-blue-400 tracking-tight">
              The Seymour Pawprint is an imprint of the Seymour High
              School Newspaper Club in Seymour, Connecticut.{" "}
              
            </span>
            <div className="block place-self-end text-blue-700 tracking-tighter text-xl">
              The Seymour Pawprint
            </div>
          </div>
          <span className="tracking-tight text-[.7em] text-blue-400 block WorkSans mt-4 place-self-center">
            Copyright © 2024-25 Seymour High School Newspaper Club. All rights
            reserved.  Problems with this site?  Email 26wlee@students.seymourschools.org or william.lee@seymourpawprint.com
          </span>
        </footer>
      </body>
    </html>
  );
}
