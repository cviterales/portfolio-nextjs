import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cristian Viterales",
  description: "Portfolio Cristian Viterales",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
      <Script strategy="lazyOnload" src="https://umami-gamma-beryl.vercel.app/script.js" data-website-id="82c70314-65a5-46ec-8bdc-062f16115c8d" />
    </html>
  );
}
