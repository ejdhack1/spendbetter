import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "SpendBetter - Ethical Spending Guide",
    template: "%s | SpendBetter",
  },
  description: "Research tool for ethical spending decisions. Track corporate signals on democracy, civil rights, and labor practices. Find ethical alternatives.",
  keywords: ["ethical shopping", "corporate accountability", "consumer guide", "ethical alternatives", "democracy", "civil rights", "labor rights"],
  authors: [{ name: "SpendBetter" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SpendBetter",
    title: "SpendBetter - Ethical Spending Guide",
    description: "Research companies based on their track record on democracy, civil rights, and labor practices. Find ethical alternatives.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendBetter - Ethical Spending Guide",
    description: "Research companies based on their track record on democracy, civil rights, and labor practices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
