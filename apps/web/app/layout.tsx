import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { geistMono, geistSans, inter } from "./fonts";

export const metadata: Metadata = {
  title: "Vionex",
  description: "NextJS Template with Database, Authentication & More",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
