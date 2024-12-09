"use client";

import Link from "next/link";
import styles from "./admin.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingAnimation from "@/components/loading";

export default function Home() {
  const { data: session, status } = useSession();
  const [imageSource, setImageSource] = useState("");
  
  if (status === "loading") {
    return <LoadingAnimation></LoadingAnimation>;
  }

  if (!session) {
    return <p>There was an error in retrieving your session information</p>;
  }

  const handlePfpChange = async () => {
    try {
      const response = await fetch(`${process.env.VERCEL_URL}/api/configurepfp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pfp: imageSource }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to change profile picture: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error changing profile picture:", error);
    }
  };

  return (
    <>
      <h1 className={`${styles.noBold} ${styles.adminHeader}`}>
        Welcome, {session.user?.name || "noBold"}!
      </h1>
      <h2 className={`${styles.noBold} ${styles.adminSubheader}`}>
        We&apos;re glad that you&apos;re a member of Pawprint! Here, you can
        make changes to the Pawprint website.
      </h2>

      <h3 className={styles.adminButtonHeader}>For non-editing writers</h3>
      <p>
        You must submit a manuscript of your proposed article for approval
        before publication. Editors who wish to post a new article must also
        submit a manuscript.
      </p>
      <Link href="/admin/manuscripts" className={styles.resetLinkStyles}>
        <button className={`${styles.adminButton} ${styles.standard}`}>
          View and configure my manuscripts
        </button>{" "}
      </Link>

      {session.user.role === "editor" && (
        <>
          <h3 className={styles.adminButtonHeader}>For editors</h3>
          <p>
            Editors may edit or approve pending manuscripts, or they may return
            them for revision.
          </p>
          <Link href="/admin/approve" className={styles.resetLinkStyles}>
            <button className={`${styles.adminButton} ${styles.standard}`}>
              Approve pending manuscripts
            </button>
          </Link>
          <p>
            Editors wishing to modify or delete an already-published article may
            recall it, reverting the article to the pending manuscripts list.
          </p>
          <Link href="/admin/recall" className={styles.resetLinkStyles}>
            <button className={`${styles.adminButton} ${styles.standard}`}>
              Recall published articles
            </button>
          </Link>
        </>
      )}

      <h3 className={styles.adminButtonHeader}>General settings</h3>
      <p>
        Changes to your profile picture will be reflected on all articles you
        have ever written, plus all articles that you write in the future.
      </p>

      <form onSubmit={handlePfpChange}>
        <label>
          Image source
          <input
            type="text"
            value={imageSource}
            onChange={(e) => setImageSource(e.target.value)}
          ></input>
        </label>
        <br></br>
        <button
          type="submit"
          style={{ marginTop: "7px" }}
          className={`${styles.adminButton} ${styles.standard}`}
        >
          Change profile picture
        </button>
      </form>
    </>
  );
}
