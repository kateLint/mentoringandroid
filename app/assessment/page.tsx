import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadinessQuiz from "@/components/ReadinessQuiz";

export const metadata = {
  title: "Android Engineering Career Level Assessment | AndroidEngineers 1:1",
  description:
    "Take our free 2-minute diagnostic to assess whether your skills align with Mid-Level, Senior, or Staff Android Architect roles.",
};

export default function AssessmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Career Diagnostic
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Which Android Level Are You Prepared For?
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Answer 4 quick technical scenario questions to evaluate your readiness for Senior or Staff positions and discover your highest-leverage focus area.
            </p>
          </div>

          <ReadinessQuiz />
        </div>
      </main>
      <Footer />
    </div>
  );
}
