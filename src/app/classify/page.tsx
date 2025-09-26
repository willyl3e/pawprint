import "@/styles/globals.css";
import Navigation from "@/components/nav";
import Link from "next/link";
import React from "react";

function Course(name: string, instructor: string, path:string, icon: React.ReactNode) {
  return (
    <Link href="/classify/">
      <div className="border-b bg-white text-center p-8 border-blue-300 border-r hover:scale-110 hover:border-blue-300 hover:border transition delay-150 hover:cursor-pointer">
        {icon}
        <span className="block text-2xl tracking-tighter">{name}</span>
        <span className="inter text-gray-400 tracking-tighter text-xs">
          {instructor}
        </span>
      </div>
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="bg-blue-50">
        <div className="border-b-[1px] border-blue-300">
          <div className="ml-[20%] mr-[20%] tracking-tighter text-blue-700 pt-[5%] border-blue-300 border-l border-r pb-14 pl-10 pr-10">
            <span className="font-medium text-4xl">
              The Seymour Pawprint
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#1d4ed8"
                className="inline-block ml-2 mb-2"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>{" "}
            </span>
            <span className="font-medium text-7xl block">Classify</span>
            <span className="inter mt-10 block text-blue-400 text-lg">To make prudent course selections, you can learn more about each class’s description, difficulty, and opportunities it opens up.</span>
          </div>
        </div>
        <div className="grid grid-cols-3 ml-[20%] mr-[20%] border-blue-300 border-l border-r bg-white">
          {Course(
            "AP Calculus",
            "Cathy Federowicz",
            "calc",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M400-240v-80h62l105-120-105-120h-66l-64 344q-8 45-37 70.5T221-120q-45 0-73-24t-28-64q0-32 17-51.5t43-19.5q25 0 42.5 17t17.5 41q0 5-.5 9t-1.5 9q5-1 8.5-5.5T252-221l62-339H200v-80h129l21-114q7-38 37.5-62t72.5-24q44 0 72 26t28 65q0 30-17 49.5T500-680q-25 0-42.5-17T440-739q0-5 .5-9t1.5-9q-6 2-9 6t-5 12l-17 99h189v80h-32l52 59 52-59h-32v-80h200v80h-62L673-440l105 120h62v80H640v-80h32l-52-60-52 60h32v80H400Z" />
            
            </svg>
          )}
          {Course(
            "AP Statistics",
            "Cathy Federowicz",
            "stats",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="m140-200-60-60 300-300 160 160 67-76-224-207-243 243-60-60 300-300 284 261 160-181 56 56-158 178 158 146-60 60-154-142-126 142-160-160-240 240Z" />
            </svg>
          )}
          {Course(
            "AP U.S. Government",
            "Nicole Fearon",
            "gov",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M80-120v-80h160v-160h-80v-80h84q12-75 66.5-129.5T440-636v-204h280v160H520v44q75 12 129.5 66.5T716-440h84v80h-80v160h160v80H80Zm240-80h120v-160H320v160Zm200 0h120v-160H520v160ZM326-440h308q-14-53-57-86.5T480-560q-54 0-97 33.5T326-440Zm154 0Z" />
            </svg>
          )}
          {Course(
            "AP Psychology",
            "Aaron Pawluk",
            "psych",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Zm-54 80h80l6-50q8-3 14.5-7t11.5-9l46 20 40-68-40-30q2-8 2-16t-2-16l40-30-40-68-46 20q-5-5-11.5-9t-14.5-7l-6-50h-80l-6 50q-8 3-14.5 7t-11.5 9l-46-20-40 68 40 30q-2 8-2 16t2 16l-40 30 40 68 46-20q5 5 11.5 9t14.5 7l6 50Zm40-100q-25 0-42.5-17.5T420-520q0-25 17.5-42.5T480-580q25 0 42.5 17.5T540-520q0 25-17.5 42.5T480-460Z" />
            </svg>
          )}
          {Course(
            "AP European History",
            "Heather Brown",
            "euro",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M600-120q-118 0-210-67T260-360H120v-80h122q-3-24-2.5-44.5T242-520H120v-80h140q38-106 130-173t210-67q69 0 130.5 24.5T840-748l-57 56q-37-32-83.5-50T600-760q-85 0-152 44.5T347-600h253v80H323q-4 27-3 47.5t3 32.5h277v80H347q34 71 101 115.5T600-200q53 0 99.5-18t83.5-50l57 56q-48 43-109.5 67.5T600-120Z" />
            </svg>
          )}
          {Course(
            "AP United States History",
            "Christopher Pagliaro",
            "apush",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
            </svg>
          )}
          {Course(
            "AP Environmental Science",
            "Erin Scozzafava",
            "apes",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M480-160q-56 0-105.5-17.5T284-227l-56 55q-11 11-28 11t-28-11q-11-11-11-28t11-28l55-55q-32-41-49.5-91T160-480q0-134 93-227t227-93h320v320q0 134-93 227t-227 93Zm0-80q100 0 170-70t70-170v-240H480q-100 0-170 70t-70 170q0 39 12 74.5t33 64.5l207-207q11-11 28-11t28 11q12 12 12 28.5T548-491L341-284q29 21 64.5 32.5T480-240Zm0-240Z" />
            </svg>
          )}
          {Course(
            "AP English Language",
            "Jeffrey Gilbert",
            "lang",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
            </svg>
          )}
          {Course(
            "AP Biology",
            "Caroline Sweeney",
            "bio",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M200-40v-40q0-139 58-225.5T418-480q-102-88-160-174.5T200-880v-40h80v40q0 11 .5 20.5T282-840h396q1-10 1.5-19.5t.5-20.5v-40h80v40q0 139-58 225.5T542-480q102 88 160 174.5T760-80v40h-80v-40q0-11-.5-20.5T678-120H282q-1 10-1.5 19.5T280-80v40h-80Zm138-640h284q13-19 22.5-38t17.5-42H298q8 22 17.5 41.5T338-680Zm142 148q20-17 39-34t36-34H405q17 17 36 34t39 34Zm-75 172h150q-17-17-36-34t-39-34q-20 17-39 34t-36 34ZM298-200h364q-8-22-17.5-41.5T622-280H338q-13 19-22.5 38T298-200Z" />
            </svg>
          )}
          {Course(
            "AP English Literature",
            "Jeffrey Gilbert",
            "lit",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v280l-100-60-100 60v-280H240v640Zm0 0v-640 640Zm200-360 100-60 100 60-100-60-100 60Z" />
            </svg>
          )}
          {Course(
            "AP Chemistry",
            "Kurt Zeppetello",
            "chem",
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#1d4ed8"
              className="inline"
            >
              <path d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm80-120h400L544-400H416L280-240Zm-80 40h560L520-492v-268h-80v268L200-200Zm280-280Z" />
            </svg>
          )}
          
        </div>
      </div>
    </>
  );
}
