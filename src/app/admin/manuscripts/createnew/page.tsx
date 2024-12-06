"use client";
import "./../../admin.css";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { BSON } from "mongodb";
import LexEditor from "@/components/lexicalEditorComponent";

export default function Home() {
  const [serializedState, setSerializedState] = useState<string | null>(null);
  const [successful, setSuccessful] = useState<boolean | undefined>(undefined);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const res = await fetch("/api/modifyManuscript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionType: "create",
          title: formData.title,
          content: serializedState,
          category: formData.category,
          img: formData.image,
        }),
      });

      if (res.ok) {
        setSuccessful(true);
      } else if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <>
      <h1 className="adminHeader noBold">Create new manuscript</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Category
          <input
            type="text"
            name="category"
            value={formData.category}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Image Source
          <input
            type="text"
            name="image"
            value={formData.image}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Content
        </label>
        <LexEditor onSerializedStateChange={setSerializedState} initialContent="none" />

        <span className="adminCNM">
          When your manuscript is created, it will be be visible to editors
          immediately and may be subject to editing. Submit only your final
          draft here.
        </span>

        <button type="submit" className="adminButton standard">
          Create new
        </button>
        {successful && (
          <span className="success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#78A75A"
            >
              <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
            </svg>
            Successfully changed
          </span>
        )}
        {successful === false && (
          <span className="success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#78A75A"
            >
              <path d="M382-221.91 135.91-468l75.66-75.65L382-373.22l366.43-366.43L824.09-664 382-221.91Z" />
            </svg>
            Error
          </span>
        )}
      </form>
    </>
  );
}
