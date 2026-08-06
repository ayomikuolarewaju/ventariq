// app/layout.tsx

import "./globals.css";
import { Bebas_Neue, Space_Mono, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});


const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Ventariq | plan less, experience more",
  description: "Personalized World Cup travel guides and visitor support",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${spaceMono.variable} ${inter.variable}`}>
      <body className="bg-[#0D1B4B] text-white font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
