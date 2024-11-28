"use client";

import { useEffect, useState } from "react";
import "./../../globals.css"
import "./article.css"

type ReturnedArticle = {
  title: string;
  author: string;
  date: string;
  content: string;
  path: string;
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
        const res = await fetch("/api/retrieveArticle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: params.articlePath }), // wrap in an object
        });

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

    fetchData();
  }, [params.articlePath]);

  useEffect(() => {
    if (article) {
      document.title = article.title;
    }
  }, [article]);

  return (
    <div>
      {article ? (
        <div>
          <h1>{article.title}</h1>
          <p>{article.author}</p>
          <p>{article.date}</p>
          <p>{article.content}</p>
        </div>
      ) : (
        <>
          <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Loading" />
          <p>Loading...</p>
        </>
      )}
    </div>
  );
}