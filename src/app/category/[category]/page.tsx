"use client";
import "./page.css";
import { useState, useEffect } from "react";
import returnDateDetails from "@/components/date";
import Link from "next/link";
import "@/styles/globals.css";
import Navigation from "@/components/nav";
import LoadingAnimation from "@/components/loading";

type Article = {
  _id: string;
  author: string;
  img: string;
  date: string;
  title: string;
};

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [articleArray, setArticleArray] = useState<Article[] | undefined>(
    undefined
  );

  async function getCategoryArticles() {
    try {
      const res = await fetch("/api/getAllArticles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: params.category,
          numberOfArticles: 9999,
        }),
      });

      const articles = await res.json();

      setArticleArray(articles.data);
    } catch (error) {
      console.log(error);
    }
  }

  const expandedNames: Record<string, string> = {
    us: "United States",
    ct: "Connecticut",
    sports: "Sports",
    opinion: "Opinion",
  };
  
  useEffect(() => {
    document.title = expandedNames[params.category] || "404";
  }, []);

  useEffect(() => {
    getCategoryArticles();
  }, []);

  let expandedName;

  

  function isValidCategory(
    category: string
  ): category is keyof typeof expandedNames {
    return category in expandedNames;
  }

  if (isValidCategory(params.category)) {
    expandedName = expandedNames[params.category];
  } else {
    return (
      <>
      404
      </>
    )
  }

  return (
    <>
      <Navigation></Navigation>
      <div className="ml-[20%] mr-[20%] mt-10 max-xl:ml-[5%] max-xl:mr-[5%]">
        <span className="text-[2.5em]">{expandedName || params.category}</span>
        {articleArray ? (
          <>
            <div className=" mt-[2%] border-t-[1px] border-t-[#cecece] pt-5 pb-5">
              {articleArray.map((i) => {
                const { monthString, dayString, numberday, year } =
                  returnDateDetails(i.date);
                return (
                  <>
                    <Link href={`/article/${i._id}`}>
                      <div key={i._id} className="articleBlock mb-6">
                        <img src={i.img} width="100%"></img>
                        <div className="ml-7">
                          <span className="block text-[2em] leading-9 mb-3 mt-1">
                            {i.title}
                          </span>
                          <span className="WorkSans text-[#969696] text-[.8em]">
                            {i.author} ∙{" "}
                          </span>
                          <span className="WorkSans text-[#969696] text-[.8em]">{`${dayString}, ${monthString} ${numberday}, ${year}`}</span>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <LoadingAnimation></LoadingAnimation>
          </>
        )}
      </div>
    </>
  );
}
