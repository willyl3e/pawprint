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
        <footer className="border-t-[1px] border-[#cecece] mt-[4.5%] ml-[20%] mr-[20%] pt-4 mb-[3.5%] adminFooter max-xl:ml-[5%] max-xl:mr-[5%]">
          <div className="grid grid-cols-2">
            <span className="block WorkSans text-[.7em] leading-[1em] text-[#aaaaaa]">
              The Seymour Pawprint is the news imprint of the Seymour High
              School Newspaper Club in Seymour, Connecticut.{" "}
              <Link href="/admin" target="_BLANK">
                <span className="text-blue-600 block mt-2">
                  Pawprint for writers...
                </span>
              </Link>
            </span>
            <div className="block place-self-end">
              <Link href="/">
                <img
                  src="/pawprintlogo.png"
                  width="200px"
                  className="inline-block"
                ></img>
              </Link>
            </div>
          </div>
          <span className="text-[.7em] text-[#aaaaaa] block WorkSans mt-4 place-self-center">
            Copyright © 2024 Seymour High School Newspaper Club. All rights
            reserved.
          </span>
        </footer>
      </body>
    </html>
  );
}
