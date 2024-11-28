"use client";

import Link from "next/link";
import "./admin.css";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div style={{textAlign:"center"}}><img src="https://i.gifer.com/ZKZg.gif" width="40px"></img></div>;
  }

  if (!session) {
    return <p>There was an error in retrieving your session information</p>;
  }

  return (
    <>
      <h1 className="noBold adminHeader">
        Welcome, {session.user?.name || "noBold"}!
      </h1>
      <h2 className="noBold adminSubheader">
        We're glad that you're a member of Pawprint! Here, you can make changes
        to the Pawprint website.
      </h2>

      <h3 className="adminButtonHeader">For non-editing writers</h3>
      <p>You must submit a manuscript of your proposed article for approval before publication.  Editors who wish to post a new article must also submit a manuscript.</p>
      <Link href="/admin/manuscripts" className="resetLinkStyles">
        <button className="adminButton standard">View and configure my manuscripts</button>{" "}
      </Link>

      <h3 className="adminButtonHeader">For editors</h3>
      <p>Editors may edit or approve pending manuscripts, or they may return them for revision.</p>
      <Link href="/admin/approve" className="resetLinkStyles">
        <button className="adminButton standard">Approve pending manuscripts</button>
      </Link>
      <p>Editors wishing to modify or delete an already-published article may recall it, reverting the article to the pending manuscripts list.</p>
      <Link href="/recall" className="resetLinkStyles">
        <button className="adminButton standard">Recall published articles</button>
      </Link>

      <h3 className="adminButtonHeader">General settings</h3>
      <p>Changes to your profile picture will be reflected on all articles you have ever written, plus all articles that you write in the future.</p>

      <Link href="/configurepfp" className="resetLinkStyles">
        <button className="adminButton standard">Change profile picture</button>
      </Link>

      <h3 className="adminButtonHeader">Documentation</h3>
      <p>You may leverage the markdown rules to format your manuscripts.</p>

      <a href="/admin/md-guide.pdf" className="resetLinkStyles" target="_blank">
        <button className="adminButton standard">See markdown guide (.pdf)</button>
      </a>
    </>
  );
}
