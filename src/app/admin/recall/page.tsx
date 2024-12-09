"use client";
import { useEffect, useState } from "react";
import { BSON } from "mongodb";
import styles from "../admin.module.css";
import LoadingAnimation from "@/components/loading";

type Article = {
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

export default function Recall() {
  const [articleList, setArticleList] = useState<Article[]>();

  async function request(actionType: string, id?: BSON.ObjectId) {
    const res = await fetch("/api/recall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actionType,
        id,
      }),
    });
    const result = await res.json();
    if (actionType === "getAll") {
      setArticleList(result.data);
    }
  }

  useEffect(() => {
    request("getAll");
  }, []);

  function handleRecallClick(id: BSON.ObjectId) {
    request("recallAction", id);
    window.location.reload();
  }

  return (
    <>
      <h1 className={`${styles.adminHeader} ${styles.noBold}`}>
        All Published Articles
      </h1>
      {articleList ? (
        <>
          {articleList?.map((x) => (
            <div key={x._id?.toString()} className={styles.adminSection}>
              <h3 className={styles.adminButtonHeader}>{x.title}</h3>
              <span>{x.author}</span>
              <span className={styles.adminBlock}>{x.category}</span>
              <div style={{ marginTop: "1em" }}>
                {x.history?.map((historyItem, index) => (
                  <span className={styles.historyItem} key={index}>
                    {historyItem}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleRecallClick(x._id!)}
                style={{ marginTop: "14px" }}
                className={`${styles.adminButton} ${styles.delete}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14px"
                  viewBox="0 -960 960 960"
                  width="14px"
                  fill="#cc250f"
                >
                  <path d="M792-56 686-160H260q-92 0-156-64T40-380q0-77 47.5-137T210-594q3-8 6-15.5t6-16.5L56-792l56-56 736 736-56 56ZM260-240h346L284-562q-2 11-3 21t-1 21h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm185-161Zm419 191-58-56q17-14 25.5-32.5T840-340q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-27 0-52 6.5T380-693l-58-58q35-24 74.5-36.5T480-800q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 39-15 72.5T864-210ZM593-479Z" />
                </svg>
                Recall
              </button>
            </div>
          ))}
        </>
      ) : (
        <LoadingAnimation></LoadingAnimation>
      )}
    </>
  );
}
