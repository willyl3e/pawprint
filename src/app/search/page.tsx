"use client";

import { Search } from "@/components/search";
import "@/styles/globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SearchPage() {
  const router = useRouter();

  function handleReturn() {
    router.back();
  }

  useEffect(() => {
    document.title = "Search ";
  }, []);

  return (
    <>
    <div className="text-center pt-10">
      <span
        className="t-10 block WorkSans text-[.8em] text-[#aaaaaa] cursor-pointer"
        onClick={() => handleReturn()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="14px"
          viewBox="0 -960 960 960"
          width="14px"
          fill="#aaaaaa"
          className="inline"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
        Back
      </span>
      <h1 className=" text-[2em] pt-3 block">Search the Pawprint</h1></div>
      <Search></Search>
    </>
  );
}
