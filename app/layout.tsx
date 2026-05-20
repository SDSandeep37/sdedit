import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Desgins/Navbar/Navbar";
import Footer from "./Desgins/Footer/Footer";
import { UserAuthProvider } from "@/Contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SDEDIT-Software Developers EDIT",
  description: "Smart Dynamic Environment for Dialogue, Interaction & Thought",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* <body className="min-h-full flex flex-col">{children}</body> */}
      <body className="min-h-full flex flex-col">
        <UserAuthProvider>
          <Navbar></Navbar>
          <main style={{ marginTop: "80px" }}>{children}</main>
          <Footer></Footer>
        </UserAuthProvider>
      </body>
    </html>
  );
}
