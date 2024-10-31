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
    <html lang="en">
      <body
        className={`bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
