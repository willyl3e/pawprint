"use client";

import { useState, useEffect } from "react";
import Form from "@/components/editForm";
import styles from "./../admin.module.css";
import LoadingAnimation from "@/components/loading";

type CommentProps = {
  id: string;
};

function Comment({ id }: CommentProps) {
  const [comment, setComment] = useState("");

  async function postComment() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionType: "comment",
          id: id,
          comment: comment,
        }),
      });
      // Optionally handle the response
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  function handleChange(newComment: string) {
    setComment(newComment);
  }

  function handleSubmit() {
    postComment(); // Call the async function
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={comment}
          onChange={(e) => handleChange(e.target.value)}
          style={{ borderColor: "#cecece" }}
          className={styles.input}
        />
      </label>
      <button
        type="submit"
        className={`${styles.adminButton} ${styles.standard}`}
        style={{ marginBottom: "10px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="14px"
          viewBox="0 -960 960 960"
          width="14px"
          fill="#1155cc"
          className={styles.iconOffset}
        >
          <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </svg>
        Send Comment
      </button>
    </form>
  );
}

export default function Approve() {
  const [allManuscripts, setAllManuscripts] = useState<
    Manuscript[] | undefined
  >(undefined);

  const [showModifyMenu, setShowModifyMenu] = useState<{
    shown: boolean;
    articleId: string | undefined;
    category: string | undefined;
    image: string | undefined;
    path: string | undefined;
    author: string | undefined;
    title: string | undefined;
    history: string[] | undefined;
    content: string | undefined;
  }>({
    shown: false,
    articleId: undefined,
    category: undefined,
    image: undefined,
    path: undefined,
    author: undefined,
    title: undefined,
    history: undefined,
    content: undefined,
  });

  async function sendRequest(
    actionType: string,
    id: string | undefined,
    category: string | undefined,
    image: string | undefined,
    path: string | undefined,
    title: string | undefined,
    content: string | undefined
  ) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actionType,
        id,
        category,
        image,
        path,
        title,
        content,
      }),
    });
    const result = await res.json();
    if (actionType === "getAllArticles") {
      setAllManuscripts(result.data);
    }
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    if (!result.data) {
      console.log("result.data non-existent");
    }
  }

  useEffect(() => {
    sendRequest(
      "getAllArticles",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }, []);

  function handleButtonClick(
    actionType: string,
    articleId: string,
    title?: string
  ) {
    sendRequest(
      actionType,
      articleId,
      undefined,
      undefined,
      undefined,
      title,
      undefined
    );
    window.location.reload();
  }

  console.log(allManuscripts);

  return (
    <>
      <h1 className={`${styles.adminHeader} ${styles.noBold}`}>
        All Manuscripts
      </h1>
      {allManuscripts ? (
        <>
          {allManuscripts?.map((x) => (
            <div key={x._id?.toString()} className={`${styles.adminSection}`}>
              <h3 className={`${styles.adminButtonHeader}`}>{x.title}</h3>{" "}
              <span className={styles.adminBlock}>{x.category}</span>
              <div style={{ marginTop: "1em" }}>
                {x.history?.map((historyItem) => (
                  <span key={x._id?.toString()} className={styles.historyItem}>
                    {historyItem}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                <button
                  onClick={() =>
                    setShowModifyMenu((prevState) => ({
                      ...prevState,
                      shown: true,
                      articleId: x._id,
                      category: x.category!,
                      image: x.img!,
                      path: x.path!,
                      author: x.path!,
                      title: x.title!,
                      content: x.content!,
                    }))
                  }
                  className={`${styles.adminButton} ${styles.standard}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14px"
                    viewBox="0 -960 960 960"
                    width="14px"
                    fill="#1155cc"
                    className={styles.iconOffset}
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  Modify
                </button>
                <button
                  onClick={() =>
                    handleButtonClick("publish", x._id!.toString(), x.title)
                  }
                  className={`${styles.adminButton} ${styles.standard}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14px"
                    viewBox="0 -960 960 960"
                    width="14px"
                    fill="#1155cc"
                  >
                    <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
                  </svg>
                  Publish
                </button>
                <button
                  onClick={() => handleButtonClick("delete", x._id!.toString())}
                  className={`${styles.adminButton} ${styles.delete}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14px"
                    viewBox="0 -960 960 960"
                    width="14px"
                    fill="#cc250f"
                    className={styles.iconOffset}
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                  Delete
                </button>
              </div>
              <Comment id={x._id!.toString()!} />
            </div>
          ))}
        </>
      ) : (
        <LoadingAnimation></LoadingAnimation>
      )}

      {showModifyMenu.shown && (
        <>
          <div className={styles.adminGreyer}>
            <div className={styles.adminCenterDiv}>
              <h2 className={styles.serifTitle}>
                Change {showModifyMenu.title}
              </h2>
              <Form modifyMenuObject={showModifyMenu}></Form>
              <button
                className={`${styles.adminButton} ${styles.standard}`}
                onClick={() =>
                  setShowModifyMenu((prevState) => ({
                    ...prevState,
                    shown: false,
                  }))
                }
                style={{ marginTop: "1em", display: "block" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14px"
                  viewBox="0 -960 960 960"
                  width="14px"
                  fill="#1155cc"
                  className={styles.iconOffset}
                >
                  <path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" />
                </svg>
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

type Manuscript = {
  _id?: string;
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
