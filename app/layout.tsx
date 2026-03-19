import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bloom Globe",
  description:
    "Discover where flowers are blooming around the world by month, with destination insights and a saved wishlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
