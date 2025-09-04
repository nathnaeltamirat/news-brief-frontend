import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./contexts/ThemeContext";
import { I18nProvider } from "@/components/I18nProvider";
import ActiveCategoryProvider from "./contexts/ActiveCategoryContext";
// adjust path if needed

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
        <I18nProvider>
          <ThemeProvider>
            <ActiveCategoryProvider>
              {children}
            </ActiveCategoryProvider>
        
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
