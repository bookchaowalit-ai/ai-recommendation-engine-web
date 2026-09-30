import type { Metadata } from "next";
import { DM_Mono, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const dmMono = DM_Mono({ variable: "--font-dm-mono", weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ranking Desk — bookchaowalit",
  description: "A transparent, rule-based recommender for the Bookchaowalit project catalog.",
  keywords: ["recommendation engine", "bookchaowalit", "ranking interface"],
  authors: [{ name: "bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  openGraph: { type: "website", locale: "en_US", title: "Ranking Desk — bookchaowalit", description: "A transparent, rule-based recommender for the Bookchaowalit project catalog.", siteName: "Ranking Desk" },
  twitter: { card: "summary", title: "Ranking Desk — bookchaowalit", description: "A transparent, rule-based recommender for the Bookchaowalit project catalog.", creator: "@bookchaowalit" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${newsreader.variable} ${jakarta.variable} ${dmMono.variable}`}>{children}</body></html>;
}
