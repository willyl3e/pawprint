"use client";

import { Search } from "@/components/search";
import "@/styles/globals.css"
import Link from "next/link";

export default function SearchPage() {
  return (
    <>
      <Link href="/" className="pl-[30%] pt-10 block"><span>Back home</span></Link>
      <h1 className="pl-[30%] text-[2em] pt-3 block">Search the Pawprint</h1>
      <Search></Search>
    </>
  );
}
