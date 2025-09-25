import "@/styles/globals.css";
import Navigation from "@/components/nav";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navigation></Navigation>
      <div className="bg-blue-50">
        <div className=" ml-[20%] mr-[20%] tracking-tighter text-blue-700 pt-[5%] border-blue-300 border-l border-r  pb-14 pl-10 pr-10">
          <span className="font-medium text-4xl inline-block">
            The Seymour Pawprint
          </span>
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
          <span className="font-medium text-7xl block">Puzzles</span>
        </div>
        <div className=" ml-[20%] mr-[20%] border-l border-r border-blue-300 border-t grid grid-cols-3">
          <Link href="/puzzles/connections">
            <div className="bg-white text-center p-8 border-blue-300 border-r hover:scale-110 hover:border-blue-300 hover:border transition delay-150 hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#1d4ed8"
                className="inline-block"
              >
                <path d="M600-120v-120H440v-400h-80v120H80v-320h280v120h240v-120h280v320H600v-120h-80v320h80v-120h280v320H600ZM160-760v160-160Zm520 400v160-160Zm0-400v160-160Zm0 160h120v-160H680v160Zm0 400h120v-160H680v160ZM160-600h120v-160H160v160Z" />
              </svg>
              <span className="block text-2xl tracking-tighter">
                Connections
              </span>
              <span className="inter text-gray-400 tracking-tighter text-xs">
                New puzzle available every Monday
              </span>
            </div>
          </Link>
          <Link href="/puzzles/deskguesser">
            <div className="bg-white text-center p-8 border-blue-300 border-r  hover:scale-110 hover:border-blue-300 hover:border transition delay-150 hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#1d4ed8"
                className="inline-block"
              >
                <path d="M80-240v-480h800v480h-80v-80H640v80h-80v-400H160v400H80Zm560-320h160v-80H640v80Zm0 160h160v-80H640v80Z" />
              </svg>
              <span className="block text-2xl tracking-tighter">
                Deskguesser
              </span>
              <span className="inter text-gray-400 tracking-tighter text-xs">
                New puzzle available every Monday
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
