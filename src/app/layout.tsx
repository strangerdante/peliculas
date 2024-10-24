"use client";
import { FavoritesProvider } from "./components/FavoritesContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
