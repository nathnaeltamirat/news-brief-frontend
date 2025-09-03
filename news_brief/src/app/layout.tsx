import type { Metadata } from "next";

import "./globals.css";
import ThemeProvider from "./contexts/ThemeContext";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "News Brief",
  description: "AI summarized App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
