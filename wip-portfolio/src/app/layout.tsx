import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Chris Panicker",
  description: "Chris's WIP Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en max-h-screen max-w-screen overflow-y-hidden">
      <body
        className={`bg-black `}
      >
        {children}
      </body>
    </html>
  );
}
