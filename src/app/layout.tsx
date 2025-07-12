import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "제로 키친",
  description: "AI와 함께 음식물 쓰레기를 줄여봐요!",
  openGraph: {
    type: "website",
    title: "제로 키친",
    description: "AI와 함께 음식물 쓰레기를 줄여봐요!",
    images: "/favicon.ico",
  },
  keywords: [
    "제로 키친",
    "음식물 쓰레기",
    "음식물 쓰레기 줄이기",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
