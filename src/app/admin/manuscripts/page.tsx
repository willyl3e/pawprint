"use client";

import "./../admin.css";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { BSON } from "mongodb";
import Link from "next/link";
import Form from "@/components/editForm";

export default function Home() {
  const { data: session, status } = useSession();
  const [articleInfo, setArticleInfo] = useState<Manuscript[] | null>(null);
  const [showModifyMenu, setShowModifyMenu] = useState<{
    shown: boolean;
    articleId: BSON.ObjectId | null;
    category: string | null;
    image: string | null;
    path: string | null;
    author: string | null;
    title: string | null;
    history: string[] | null;
    content: string | null;
  }>({
    shown: false,
    articleId: null,
    category: null,
    image: null,
    path: null,
    author: null,
    title: null,
    history: null,
    content: null,
  });

  type Manuscript = {
    _id?: BSON.ObjectId;
    title?: string;
    author?: string;
    date?: Date;
    path?: string;
    category?: string;
    img?: string;
    content?: string;
    history?: string[];
    status?: string;
  };

  // Function to fetch article data
  async function sendRequest(
    actionType: string,
    id?: BSON.ObjectId,
    title?: string,
    content?: string,
    path?: string,
    category?: string,
    img?: string
  ) {
    try {
      const res = await fetch("/api/modifyManuscript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionType,
          id,
          title,
          content,
          path,
          category,
          img,
          history,
          status,
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

  useEffect(() => {
    // Example usage of sendRequest
    sendRequest("getAllArticles");
  }, []);

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src="https://i.gifer.com/ZKZg.gif"
          width="40px"
          alt="loading"
        ></img>
      </div>
    );
  }

  if (!session) {
    return <p>There was an error in retrieving your session information</p>;
  }

  return (
    <>
      <div className="manuscriptsGrid">
        <h1 className="adminHeader noBold">My Manuscripts</h1>
        <div style={{ textAlign: "right" }}>
          <Link className="resetLinkStyles" href="/admin/manuscripts/createnew">
            <button className="adminButton standard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14px"
                viewBox="0 -960 960 960"
                width="14px"
                fill="#1155cc"
                className="iconOffset"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
              Create new
            </button>
          </Link>
        </div>
      </div>
      {articleInfo ? (
        <>
          {articleInfo.map((article) => (
            <div key={article._id?.toString()} className="adminSection">
              <h3 className="adminButtonHeader">{article.title}</h3>{" "}
              <span>{article.status}</span>
              <span className="adminBlock">{article.category}</span>
              <div style={{ marginTop: "1em" }}>
                {article.history?.map((historyItem) => (
                  <span className="historyItem">{historyItem}</span>
                ))}
              </div>
              <div style={{ display: "block", paddingTop: "15px" }}>
                <button
                  onClick={() =>
                    setShowModifyMenu((prevState) => ({
                      ...prevState,
                      shown: true,
                      articleId: article._id!,
                      category: article.category!,
                      image: article.img!,
                      path: article.path!,
                      author: article.path!,
                      title: article.title!,
                      content: article.content!,
                    }))
                  }
                  className="adminButton standard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14px"
                    viewBox="0 -960 960 960"
                    width="14px"
                    fill="#1155cc"
                    className="iconOffset"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  Modify
                </button>
                <button
                  onClick={() => sendRequest("delete", article._id)}
                  className="adminButton delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14px"
                    viewBox="0 -960 960 960"
                    width="14px"
                    fill="#cc250f"
                    className="iconOffset"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Loading articles...</p>
      )}
      {showModifyMenu.shown && (
        <>
          <div className="adminGreyer">
            <div className="adminCenterDiv">
              <h2 className="serifTitle">Change {showModifyMenu.title}</h2>
              <Form modifyMenuObject={showModifyMenu}></Form>
              <button
                className="adminButton standard"
                onClick={() =>
                  setShowModifyMenu((prevState) => ({
                    ...prevState,
                    shown: false,
                  }))
                }
                style={{ marginTop: "1em", display: "block" }}
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}