"use client";

import { useEffect, useState } from "react";
import "./article.css";
import returnDateDetails from "@/components/date";
import "@/styles/globals.css";
import Navigation from "@/components/nav";

type ReturnedArticle = {
  title: string;
  author: string;
  date: string;
  content: string;
  path: string;
  img: string;
  name: string;
  pfp: string;
};
type LexicalNode = {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
};

type ParagraphNode = {
  children: LexicalNode[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
  textFormat: number;
  textStyle: string;
};

type RootNode = {
  children: ParagraphNode[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
};

type LexicalState = {
  root: RootNode;
};
export default function ClientPage({
  params,
}: {
  params: { articlePath: string };
}) {
  const [article, setArticle] = useState<ReturnedArticle | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `/api/retrieveArticle?articlePath=${params.articlePath}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();

        if (!result.data) {
          throw new Error("No data field in response");
        }

        setArticle(result.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    }

    console.log(article);

    fetchData();
  }, [params.articlePath]);

  useEffect(() => {
    if (article) {
      document.title = article.title;
    }
  }, [article]);

  let contentObject: LexicalState | undefined;

  if (article) {
    contentObject = JSON.parse(article.content);
  }

  function renderLexicalState() {
    const root = contentObject!.root;

    return root.children.map((paragraph, index) => {
      const paragraphContent = paragraph.children.map((child, i) => {
        let formattedText = <>{child.text}</>;

        if (child.format === 1) {
          formattedText = <strong key={i}>{formattedText}</strong>;
        } else if (child.format === 2) {
          formattedText = <em key={i}>{formattedText}</em>;
        }

        return formattedText;
      });

      return (
        <p key={index} className="mt-5 mb-5 tracking-tighter text-2xl">
          {paragraphContent}
        </p>
      );
    });
  }

  let returnedContent;

  if (article) {
    const { monthString, dayString, numberday, year } = returnDateDetails(
      article!.date!
    );
    returnedContent = (
      <div className="bg-blue-50">
        <Navigation></Navigation>
        {article && (
          <>
            <div className="border-blue-300 border-b">
              <div className="border-blue-300 border-l pt-14 ml-[20%] mr-[20%] pl-10 pr-10 border-r">
                <span className="font-medium tracking-tighter text-7xl text-blue-700">
                  {article.title}
                </span>
                <div className="grid grid-cols-2 mt-10 pb-10">
                  <div>
                    <span className="block inter text-blue-400 tracking-tight mb-1 mt-3">Authored on {`${dayString}, ${monthString} ${numberday}, ${year}`} by</span>
                    <span className="text-blue-700 text-3xl tracking-tighter">{article.name} &apos;26</span>
                  </div>
                  {/* 
                  <div className="">
                    <img src={article.pfp} className="w-32" ></img>
                  </div>*/}
                </div>
              </div>
            </div>
            <main className="mt-0 border-r bg-white border-l border-blue-300 pt-12 pl-10 pr-10 pb-10 mb-0">
              <img
                src={article.img}
                width="100%"
                className="border-blue-300  border-[1px] mb-10"
              ></img>

              {renderLexicalState()}
            </main>
          </>
        )}
      </div>
    );
  }

  return returnedContent;
}
