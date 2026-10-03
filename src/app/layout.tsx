import type { Metadata } from "next";
import {FitLogProvider} from "@/context/FItLogContext";
import Footer from "../components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fitlog",
  description:"workout library",
}

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0D0F]">
        <FitLogProvider>
          <div className="flex min-h-screen flex-col">

          
          <div className="flex-1">
 {children}
          </div>
          <Footer/>
         
</div>
        </FitLogProvider>




        </body>
    </html>
  );
}
