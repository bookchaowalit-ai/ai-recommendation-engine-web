import { AppFoot, AppTop } from "@/components/app-shell";
import { RankingDesk } from "@/components/ranking-desk";

const SOURCE_URL = "https://github.com/bookchaowalit-ai/ai-recommendation-engine-web";

// Server page: top bar, footer and the scoring note are plain HTML; only the desk (brief, keywords, picks) is a client component.
export default function Home() {
  return (
    <div className="as">
      <a className="as-skip" href="#main">Skip to content</a>
      <AppTop name="Ranking Desk" tagline="Rule-based picks, with the working shown" />
      <RankingDesk />
      <AppFoot source={SOURCE_URL} />
    </div>
  );
}
