import "./admin.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        {" "}
        <img src="/pawprintlogo.png" width="250px" alt="Pawprint Logo" />
      </nav>
      <main>
        <div style={{ display: "block", marginBottom: "2.5em" }}>
          <Link className="resetLinkStyles topBackTrigger" href="/admin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#2854C5"
            >
              <path d="M240-200h133.85v-237.69h212.3V-200H720v-360L480-740.77 240-560v360Zm-60 60v-450l300-225.77L780-590v450H526.15v-237.69h-92.3V-140H180Zm300-330.38Z" />
            </svg>
            
          </Link>
        </div>
        {children}
      </main>
      <span className="adminc">
        Copyright © 2024 Seymour High School Newspaper Club. All rights
        reserved.
      </span>
    </>
  );
}