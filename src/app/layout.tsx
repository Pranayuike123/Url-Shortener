import type { Metadata } from "next";
import "./globals.css";
import { initDB } from '@/lib/database'; 


initDB();

export const metadata: Metadata = {
  title: "TinyLink - URL Shortener",
  description: "Shorten your URLs with TinyLink",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}