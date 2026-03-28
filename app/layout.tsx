import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Muhammad Niaz Ali | Full Stack Developer & Software Engineer",
  description:
    "Muhammad Niaz Ali — Full Stack Web Developer & Software Engineer specializing in modern web applications, scalable systems, and cutting-edge technologies.",
  keywords: [
    "Muhammad Niaz Ali",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "Muhammad Niaz Ali" }],
  openGraph: {
    title: "Muhammad Niaz Ali | Full Stack Developer",
    description: "Building modern web experiences that push the limits.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              color: "#fff",
              border: "1px solid #1a1a1a",
            },
          }}
        />
      </body>
    </html>
  );
}
