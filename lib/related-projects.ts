export type RelatedProject = { name: string; url: string; slug: string };
export type ProjectCategory = { id: string; label: string; projects: RelatedProject[] };

const devtools = (path: string) => `https://devtools.bookchaowalit.com/${path}`;
const site = (host: string) => `https://${host}.bookchaowalit.com`;

/**
 * The Bookchaowalit project catalog the recommender ranks. Every URL is a live production address
 * (checked 2026-11-19); the single-purpose dev tools now live in the Workbench at devtools.bookchaowalit.com.
 */
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: "productivity",
    label: "Productivity",
    projects: [
      { name: "Pomodoro Timer", url: site("pomodoro-timer"), slug: "pomodoro-timer" },
      { name: "Habit Tracker", url: site("habit-tracker"), slug: "habit-tracker" },
      { name: "Goal Tracker", url: site("goal-tracker"), slug: "goal-tracker" },
      { name: "Time Tracker", url: site("time-tracker"), slug: "time-tracker" },
      { name: "Todo Board", url: site("todo-board"), slug: "todo-board" },
      { name: "Calendar App", url: site("calendar-app"), slug: "calendar-app" },
      { name: "Reminders", url: site("reminders"), slug: "reminders" },
    ],
  },
  {
    id: "dev-tools",
    label: "Dev tools",
    projects: [
      { name: "JSON Converter", url: devtools("jsonconverter"), slug: "json-converter" },
      { name: "Base64 Encoder", url: devtools("base64"), slug: "base64" },
      { name: "Regex Tester", url: devtools("regex"), slug: "regex" },
      { name: "Hash Generator", url: devtools("hashgen"), slug: "hashgen" },
      { name: "Cron Expression", url: devtools("cron"), slug: "cron" },
      { name: "Diff Checker", url: devtools("diffchecker"), slug: "diffchecker" },
      { name: "Minifier", url: devtools("minifier"), slug: "minifier" },
      { name: "URL Encoder", url: devtools("url-encoder"), slug: "url-encoder" },
      { name: "Deep Links", url: site("deeplinks"), slug: "deeplinks" },
    ],
  },
  {
    id: "content-tools",
    label: "Content tools",
    projects: [
      { name: "Markdown Editor", url: devtools("markdown-editor"), slug: "markdown-editor" },
      { name: "Text Summarizer", url: site("text-summarizer"), slug: "text-summarizer" },
      { name: "Quote Generator", url: site("quote-generator"), slug: "quote-generator" },
      { name: "Meme Generator", url: site("meme-generator"), slug: "meme-generator" },
      { name: "Number Converter", url: devtools("number-converter"), slug: "number-converter" },
      { name: "Date Calculator", url: devtools("date-calculator"), slug: "date-calculator" },
    ],
  },
  {
    id: "webmaster",
    label: "Webmaster",
    projects: [
      { name: "SEO Analyzer", url: site("seo-analyzer"), slug: "seo-analyzer" },
      { name: "Analytics Dashboard", url: site("analytics-dashboard"), slug: "analytics-dashboard" },
      { name: "Uptime Monitor", url: site("uptime-monitor"), slug: "uptime-monitor" },
      { name: "Error Logs", url: site("error-logs"), slug: "error-logs" },
      { name: "Redirect Manager", url: site("redirect-manager"), slug: "redirect-manager" },
      { name: "Status Page", url: site("status"), slug: "status" },
      { name: "Popular Pages", url: site("popular-pages"), slug: "popular-pages" },
      { name: "Link Analytics", url: site("link-analytics"), slug: "link-analytics" },
      { name: "Webhook Tester", url: site("webhook-tester"), slug: "webhook-tester" },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    projects: [
      { name: "Contact Forms", url: site("contact-forms"), slug: "contact-forms" },
      { name: "Newsletter", url: site("newsletter"), slug: "newsletter" },
      { name: "Comments", url: site("comments"), slug: "comments" },
      { name: "Guestbook", url: site("guestbook"), slug: "guestbook" },
      { name: "Chat Playground", url: site("chat-playground"), slug: "chat-playground" },
    ],
  },
  {
    id: "main",
    label: "Main sites",
    projects: [
      { name: "Portfolio", url: "https://bookchaowalit.com", slug: "portfolio" },
      { name: "Blog", url: site("techblog"), slug: "techblog" },
      { name: "DevHub", url: site("devhub"), slug: "devhub" },
      { name: "Wiki", url: site("wiki"), slug: "wiki" },
      { name: "TechSpace", url: site("techspace"), slug: "techspace" },
      { name: "Tracking", url: site("tracking"), slug: "tracking" },
      { name: "Linktree", url: site("linktree"), slug: "linktree" },
    ],
  },
];
