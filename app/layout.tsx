import type { Metadata } from "next";
import { Inter, Mulish } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const inter = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book List",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
