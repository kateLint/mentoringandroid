import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: September 2026
            </p>
          </div>

          <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Nature of the Service</h2>
              <p>
                AndroidEngineers 1:1 Mentorship provides educational consulting, technical coaching, and professional advisory sessions. We do not guarantee employment, promotion, specific salary outcomes, or job placement with any particular company. Success in interviews depends on your own preparation, practice, and execution.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Attendance & Late Policy</h2>
              <p>
                Please join the video call on time. If you are delayed, the session will still conclude at the scheduled end time to respect subsequent bookings. Sessions will be considered cancelled without refund if the mentee fails to join within 15 minutes of the start time without prior notice.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Rescheduling Policy</h2>
              <p>
                You may reschedule your booking free of charge up to 24 hours before the scheduled appointment via the link in your confirmation email or by contacting support.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Intellectual Property</h2>
              <p>
                All personalized action plans, code advice, and notes created specifically for you are yours to use freely for your career and projects. Re-distribution or commercial resale of the mentor&apos;s proprietary frameworks, diagrams, or materials is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">5. Contact</h2>
              <p>
                Questions regarding these terms may be directed to{" "}
                <a href="mailto:support@mentoringandroid.dev" className="text-emerald-700 underline font-semibold">
                  support@mentoringandroid.dev
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
