import "./styles.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        <Link href="/">
          <img src="/pawprintlogo.png" width="250px"></img>
        </Link>
      </nav>
      {children}
    </>
  );
}
