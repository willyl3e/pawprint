"use client";

import Link from "next/link";
import { useState } from "react";
import "./components.css";
import "@/styles/globals.css";

export default function Navigation() {
  const [sideNav, setSideNav] = useState(false);

  return (
    <>
      {sideNav && (
        <>
          <div className="overlay"></div>
          <div className="left-div ">
            <span className="pl-7 pr-4 tracking-tighter text-blue-700 text-2xl mt-7 mb-4 block">
              The Seymour Pawprint
            </span>
            <Link href="/category/seymour">
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans tracking-tighter">
                Seymour
              </div>
            </Link>
            <Link href={`/category/us`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans tracking-tighter">
                U.S.
              </div>
            </Link>
            <Link href={`/category/ct`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans tracking-tighter">
                Connecticut
              </div>
            </Link>
            <Link href={`/category/sports`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans tracking-tighter">
                Sports
              </div>
            </Link>
            <Link href={`/category/opinion`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans tracking-tighter">
                Opinion
              </div>
            </Link>
            <div
              className="text-[.75em] pl-7 pr-4 pt-1 pb-1 mb-1 mt-5 WorkSans hover:bg-[#e7e7e7] cursor-pointer"
              onClick={() => setSideNav(!sideNav)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="13px"
                viewBox="0 -960 960 960"
                width="13px"
                fill="#000000"
                className="inline mr-1 relative bottom-[.5px]"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              RETURN
            </div>
          </div>
        </>
      )}
      <nav className="nav bg-blue-50 border-b-blue-50 drop-shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#1155cc"
          className="menuItem"
          onClick={() => setSideNav(!sideNav)}
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
        <div className="inline">
          <Link href="/">
            <span className="tracking-tighter text-blue-700 text-3xl block mb-2">
              The Seymour Pawprint
            </span>
          </Link>
        </div>
        <div>
          <Link href="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1155cc"
              className="place-self-end"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </Link>
        </div>
      </nav>
    </>
  );
}
