"use client";

import { useEffect, useState } from "react";
import "./article.css";
import Link from "next/link";

type ReturnedArticle = {
  title: string;
  author: string;
  date: string;
  content: string;
  path: string;
  img: string;
  name:string;
  pfp:string;
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

      return <p key={index}>{paragraphContent}</p>;
    });
  }

  return (
    <div>
      <nav>
        <Link href="/">
          <img src="/pawprintlogo.png" width="250px" style={{placeSelf:"Center"}}></img>
        </Link>
      </nav>
      {article ? (
        <>
          <div className="articleHead">
            <span className="title">{article.title}</span>
            <span className="datePub">{article.date}</span>
          </div>
          <div className="imgContainer">
            <img src={article.img}></img>
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
        <>
          <img
            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
            alt="Loading"
          />
          <p>Loading...</p>
        </>
      )}
    </div>
  );
}
