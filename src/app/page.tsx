"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./home.css";
import "./globals.css";
import "@/styles/globals.css";
import "@/components/components.css";
import returnDateDetails from "@/components/date";

type ArticleInfo = {
  _id: string;
  img: string;
  title: string;
  date: string;
  path: string;
};

function FilterArticles(
  cat: string,
  recency: number,
  numberOfArticles: number
): ArticleInfo[] | null {
  const [articleInfo, setArticleInfo] = useState<ArticleInfo[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/getAllArticles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: cat,
            mustBeRecent: recency,
            numberOfArticles: numberOfArticles,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();

        if (!result.data) {
          throw new Error("No data field in response");
        }

        setArticleInfo(result.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchData();
  }, [cat, recency, numberOfArticles]);

  return articleInfo;
}

function generateArticleElements(
  cat: string,
  recency: number,
  numberOfArticles: number
) {
  const returnedArticleArray = FilterArticles(cat, recency, numberOfArticles);

  const contents = returnedArticleArray?.map((x) => {
    const { monthString, dayString, numberday, year } = returnDateDetails(
      x.date
    );
    return (
      <>
        <Link href={"/article/" + x._id} key={x._id}>
          <div className="mb-12">
            <img src={x.img}></img>
            <div className="">
              <span className="text-4xl block leading-[1em] mt-5 mb-2  tracking-tighter">
                {x.title}
              </span>
              <span className="inter text-[#969696] text-[.8em] tracking-tight">{`${dayString}, ${monthString} ${numberday}, ${year}`}</span>
            </div>
          </div>
        </Link>
      </>
    );
  });

  return <>{contents}</>;
}

export default function Home() {
  useEffect(() => {
    document.title = "SHS Pawprint";
  });

  return (
    <>
      <div className="bg-blue-50">
        <div className=" ml-[20%] mr-[20%] text-7xl tracking-tighter text-blue-700 pt-[5%] border-blue-300 border-l border-r grid gird-cols-[60%_40%] pb-14">
          <span className="font-medium pl-10">The Seymour Pawprint</span>
        </div>
        <div className=" pl-[20%] pr-[20%] grid grid-cols-[60%_40%] border-t border-blue-300">
          <div className="border-blue-300 border-l border-r">
            <div className=" p-10 bg-white">
              <span className="text-blue-700 inter tracking-tight text-lg block mb-4 border-blue-300 pb-1">
                Top story
              </span>
              <span className="mb-5 block text-5xl leading-[1] tracking-tighter">
                Quran club kicks off with fresh energy
              </span>

              <img
                width="100%"
                src="https://images.pexels.com/photos/12631212/pexels-photo-12631212.jpeg"
              ></img>
            </div>
          </div>
          <div className="pr-8 pl-10">
            <span className=" text-blue-700 tracking-tighter text-4xl block leading-[1.1] pt-8">
              Seymour · United States · Connecticut · Sports · Opinion · Puzzles
              · Classify · Comics & Photos · The Club · Search
            </span>
          </div>
          <div className="border-blue-300 border-l border-r h-24"></div>
        </div>

        <div className="grid grid-cols-[7.5%_60%_32.5%] min-h-64 pl-[20%] pr-[20%] border-t-blue-300 border-[1px]">
          <div className="flex items-start justify-center text-5xl tracking-tighter text-blue-700 border-r border-blue-300">
            <span className="transform rotate-90 whitespace-nowrap relative top-24 tracking-tight mr-6">
              Seymour
            </span>
          </div>

          <div className="border-blue-300 border-r p-10 bg-white">
            {generateArticleElements("us", 30, 2)}
          </div>
          <div className="border-blue-230 border-t">
            <p>Right side content</p>
          </div>
        </div>
      </div>

      {/*
    <>
    
      {sideNav && (
        <>
          <div className="overlay"></div>
          <div className="left-div">
            <img
              src="/pawprintlogo.png"
              width="225px"
              className="ml-7 mb-6 mt-3"
            ></img>
            <Link href={`/category/seymour`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans">
                Seymour
              </div>
            </Link>
            <Link href={`/category/us`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans">
                U.S.
              </div>
            </Link>
            <Link href={`/category/ct`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans">
                Connecticut
              </div>
            </Link>
            <Link href={`/category/sports`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans">
                Sports
              </div>
            </Link>
            <Link href={`/category/opinion`}>
              <div className="pl-7 pr-4 pt-1 pb-1 mb-1 mt-1 hover:bg-[#e7e7e7] WorkSans">
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
      <div>
        <div className="pt-[2%] pl-[20%] pr-[20%] bg-blue-900 text-white pb-14">
          <div>
            <div id="topHeader">
              <div className="leftHeaderContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#ffffff"
                  onClick={() => setSideNav(!sideNav)}
                  className="cursor-pointer"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              </div>
              <div className="text-center">
                <span className="text-3xl inter tracking-tight font-bold">
                  Seymour Pawprint
                </span>
              </div>
              <div className="alignRight">
                <div className="text-right items-end">
                  <Link href="/search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 -960 960 960"
                      width="30px"
                      fill="#ffffff"
                      className="inline"
                    >
                      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div id="leadArticle">
            <img
              width="100%"
              src="https://i1.wp.com/contingentmagazine.org/wp-content/uploads/2023/03/US_Navy_030402-N-5362A-004_U.S._Army_Sgt._Mark_Phiffer_stands_guard_duty_near_a_burning_oil_well_in_the_Rumaylah_Oil_Fields_in_Southern_Iraq.jpg?resize=771%2C506&ssl=1"
            ></img>
            <div id="leadArticleText">
              <span id="leadTitle">Something about the news............</span>
              <span id="leadSubtitle">
                Details remain scarce, U.S. prepares response
              </span>
              <span className="small leadArticleSpacer">12/1/2024</span>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="leftArticles">
            <span className="block pt-10 text-[.85em] mb-3 work text-[#808080]">
              UNITED STATES
            </span>
            {generateArticleElements("us", 30, 3)}
            <span className="block pt-10 text-[.85em] mb-3 work text-[#808080]">
              CONNECTICUT
            </span>
            {generateArticleElements("connecticut", 30, 3)}
            <span className="block pt-10 text-[.85em] mb-3 work text-[#808080]">
              SPORTS
            </span>
            {generateArticleElements("sports", 30, 3)}
            <span className="block pt-10 text-[.85em] mb-3 work text-[#808080]">
              OPINION
            </span>
            {generateArticleElements("opinion", 30, 3)}
          </div>
          <div className="rightArticles"></div>
        </div>
      </div>
    </> */}
    </>
  );
}
