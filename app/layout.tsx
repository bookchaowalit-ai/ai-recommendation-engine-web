import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// The font variable sits on <html>: the App shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "Pick a goal and get Bookchaowalit projects ranked by hand-set rules and your keywords, with every point of every score shown. No machine-learning model.";

export const metadata: Metadata = {
  title: "Ranking Desk | Bookchaowalit",
  description,
  keywords: ["recommendation engine", "rule-based ranking", "bookchaowalit"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: "/", title: "Ranking Desk | Bookchaowalit", description, siteName: "Bookchaowalit" },
  twitter: { card: "summary", title: "Ranking Desk | Bookchaowalit", description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
