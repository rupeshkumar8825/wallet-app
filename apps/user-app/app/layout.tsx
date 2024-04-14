import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
// import { AppbarClient } from "../components/AppbarClient";
import AppbarClient from "../components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet App",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <AppbarClient></AppbarClient>
       <body className={inter.className}>{children}</body>

      </Providers>
    </html>
  );
}
