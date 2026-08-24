import type { Metadata } from "next";
import { DM_Mono, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const dmMono = DM_Mono({ variable: "--font-dm-mono", weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ranking Desk — bookchaowalit",
  description: "An honest recommendation-engine interface before the model is connected.",
  keywords: ["recommendation engine", "bookchaowalit", "ranking interface"],
  authors: [{ name: "bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  alternates: { canonical: "https://bookchaowalit.com" },
  openGraph: { type: "website", locale: "en_US", url: "https://bookchaowalit.com", title: "Ranking Desk — bookchaowalit", description: "An honest recommendation-engine interface before the model is connected.", siteName: "Ranking Desk", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ranking Desk" }] },
  twitter: { card: "summary_large_image", title: "Ranking Desk — bookchaowalit", description: "An honest recommendation-engine interface before the model is connected.", images: ["/og-image.png"], creator: "@bookchaowalit" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${newsreader.variable} ${jakarta.variable} ${dmMono.variable}`}>{children}</body></html>;
}
