"use client";

import { useEffect, useState } from "react";
import "./article.css";
import LoadingAnimation from "@/components/loading";
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
        <p key={index} className="mt-5 mb-5">
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
      <div>
        <Navigation></Navigation>
        {article ? (
          <>
            <div className="articleHead">
              <span className="title">{article.title}</span>
              <span className="datePub">{`${dayString}, ${monthString} ${numberday}, ${year}`}</span>
            </div>
            <div className="imgContainer">
              <img src={article.img} width="100%"></img>
            </div>
            <main>
              <div className="infoBox">
                <div className="authorImageBox">
                  <img src={article.pfp} className="pfp"></img>
                </div>
                <div>
                  <span className="authorNameLink">{article.name}</span>
                </div>
              </div>
              {renderLexicalState()}
            </main>
          </>
        ) : (
          <LoadingAnimation></LoadingAnimation>
        )}
      </div>
    );
  }

  return  returnedContent ;
}
