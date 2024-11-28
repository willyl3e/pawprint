"use client";

import "./../admin.css";
import { useState, useEffect } from "react";
import { BSON } from "mongodb";
import e from "express";

export default function Approve() {
  const [allManuscripts, setAllManuscripts] = useState<Manuscript[] | null>(
    null
  );
  async function getAllArticles() {
    const res = await fetch("/api/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actionType: "getAllArticles" }),
    });
    const result = await res.json();
    setAllManuscripts(result.data);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    if (!result.data) {
      throw new Error("No data field in response");
    }
  }
  useEffect(() => {
    getAllArticles();
  }, []);

  console.log(allManuscripts)

  return (
    <>
      <h1 className="adminHeader noBold">All Manuscripts</h1>
      {allManuscripts?.map((x) => (
        <div key={x._id?.toString()} className="adminSection">
          <h3 className="adminButtonHeader">{x.title}</h3>{" "}
          <span>{x.status}</span>
          <span className="adminBlock">{x.category}</span>
          <div style={{ marginTop: "1em" }}>
            {x.history?.map((historyItem) => (
              <span className="historyItem">{historyItem}</span>
            ))}
          </div>
          <Comment></Comment>
        </div>
      ))}
    </>
  );
}

function Comment() {
  const [comment, setComment] = useState("")

  async function postComment() {
    try {
      const res = await fetch("/api/approve", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({actionType:"comment", comment:comment})
      })
    } catch {

    }
  }

  function handleChange(newComment:string) {
    setComment(newComment)
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    
  }

  return (
    <form onSubmit={()=>handleSubmit(e.)}>
      <label> Comment on this manuscript
        <input type="text" onChange={(e)=>handleChange(e.target.value)}></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

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
