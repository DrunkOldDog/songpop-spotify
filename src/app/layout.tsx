import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/layout-client";
import { Session, getServerSession } from "next-auth";
import { ChakraProvider } from "@/app/lib/chakra";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Navbar {...(data ?? ({} as Session))} />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
