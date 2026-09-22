import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Layers,
  ArrowRight,
  Download,
  ExternalLink,
  Sparkles,
  Smartphone,
  Cpu,
} from "lucide-react";

export const metadata = {
  title: "Free Android Engineering & Architecture Resources | AndroidEngineers 1:1",
  description:
    "Curated guides on Mobile System Design, Jetpack Compose optimization, Staff Engineer interviews, and modern Kotlin Multiplatform architecture.",
};

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Mobile System Design Framework",
      tag: "Interview Guide",
      icon: Cpu,
      description:
        "The 4-step blueprint for acing 45-minute mobile system design interviews: Requirements & Scoping, High-Level Module Architecture, Offline Data & Concurrency, and Deep-Dive Tradeoffs.",
      keyPoints: [
        "Offline-first synchronization with Room & SQLite",
        "Reactive data flow with Kotlin StateFlow/SharedFlow",
        "Image caching, pagination, and memory pressure mitigation",
        "Network resilience, retry backoff, and idempotent mutations",
      ],
    },
    {
      title: "Jetpack Compose Performance Audit",
      tag: "Architecture Checklist",
      icon: Layers,
      description:
        "Practical checklist to eliminate unnecessary recompositions, avoid state capture memory leaks, and maintain 120fps smooth scrolling in production Android applications.",
      keyPoints: [
        "Correct usage of derivedStateOf vs. remember(keys)",
        "Stability and immutable data models (@Immutable / @Stable)",
        "LazyColumn item keys, contentTypes, and subcompose costs",
        "Decoupling business logic with MVI uni-directional state flow",
      ],
    },
    {
      title: "Senior → Staff Android Career Roadmap",
      tag: "Career Strategy",
      icon: Code2,
      description:
        "How to transition from individual contributor writing features to a Staff-level technical leader driving multi-module architecture, CI/CD, and developer productivity across teams.",
      keyPoints: [
        "Authoring RFCs and architecture decision records (ADRs)",
        "Modularization strategies: by feature vs. by layer",
        "Measuring and reducing Gradle build times and developer friction",
        "Staff interview expectations: ambiguity handling and mentorship",
      ],
    },
  ];

  const interviewQuestions = [
    {
      q: "How would you design an offline-first chat application in Android?",
      topic: "System Design",
    },
    {
      q: "What causes memory leaks in Kotlin Coroutines and how do you prevent them with Job/CoroutineScope hierarchy?",
      topic: "Concurrency",
    },
    {
      q: "How does Jetpack Compose compiler determine parameter stability, and when does an unstable parameter trigger recomposition?",
      topic: "Jetpack Compose",
    },
    {
      q: "Explain how you structure a multi-module Kotlin Multiplatform (KMP) project sharing business logic between Android and iOS.",
      topic: "KMP & Architecture",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-slate-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Free Engineering Knowledge Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Android Architecture & Career Guides
            </h1>
            <p className="text-base sm:text-lg text-slate-600">
              Curated frameworks, interview blueprints, and architecture checklists built from a decade of production Android engineering.
            </p>
          </div>

          {/* Core Resource Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {resourceCategories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md uppercase">
                        {item.tag}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Core Takeaways:
                      </span>
                      {item.keyPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/book"
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Practice this in a 1:1 session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* High-Frequency Interview Questions */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Staff & Senior Interview Problem Sheets
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Questions asked in recent mobile architect and lead engineer interviews at top tech companies.
                </p>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-500 transition-colors"
              >
                <span>Book Mock Interview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interviewQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      {q.topic}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Q0{idx + 1}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mt-1 leading-snug">
                    {q.q}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Mentorship Callout */}
          <div className="bg-gradient-to-r from-slate-900 via-android-dark to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need Direct Feedback on Your Code?</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Get an expert line-by-line review of your real project.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Skip generic tutorials. In our 90-minute session we will review your actual repository, optimize your Compose state, and prepare you for your interviews.
            </p>
            <div className="pt-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all"
              >
                <span>Book your 1:1 strategy session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
