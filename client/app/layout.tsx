import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <div
          className="absolute hidden right-0 bottom-6  rounded-l "
          id="notification"
        ></div>
        <Navbar />
        <div className="bg-gray-700 flex-grow">{children}</div>
      </body>
    </html>
  );
}
