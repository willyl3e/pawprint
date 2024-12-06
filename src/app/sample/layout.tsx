import "./styles.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="bg-black">
        <Link href="/">
          <img src="/pawprintlogo.png" width="250px" className="place-self-center"></img>
        </Link>
      </nav>
      {children}
    </>
  );
}
