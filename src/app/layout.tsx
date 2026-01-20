import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
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
        className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col font-sans`}
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
