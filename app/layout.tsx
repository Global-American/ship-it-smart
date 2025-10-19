import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import LegalBar from "../components/LegalBar";
import LayoutClient from "../components/LayoutClient";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ship It Smart - Shipping Solutions",
  description:
    "Exclusive discounts with FedEx, DHL, and UPS for US and international shipping. Rate-based import and export services with express and economy options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen ${inter.className}`}>
        <Navigation />
        <LayoutClient>{children}</LayoutClient>
        <Footer />
        <LegalBar />
      </body>
    </html>
  );
}
