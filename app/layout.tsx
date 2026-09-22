import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mentoringandroid.dev"),
  title: "1:1 Android Mentoring | Career, System Design & Architecture Strategy",
  description:
    "Accelerate your mobile engineering career with a focused 90-minute private strategy session with a Staff Android Architect. Line-by-line review, interview preparation, and custom actionable roadmap.",
  keywords: [
    "Android Mentorship",
    "Kotlin Multiplatform",
    "Jetpack Compose",
    "Staff Android Engineer",
    "System Design Mock Interview",
    "Android Career Coaching",
  ],
  authors: [{ name: "Kate Lint" }],
  openGraph: {
    title: "1:1 Android Mentoring | Career, System Design & Architecture",
    description:
      "Book a focused 90-minute 1:1 strategy call with a Staff Android Architect. Turn ambiguous career and technical questions into an actionable roadmap.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#073042",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col text-slate-900 bg-slate-50 antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
