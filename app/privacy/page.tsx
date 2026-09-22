import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Legal Policy
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last revised: September 2026
            </p>
          </div>

          <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                When you book a mentoring session, we collect information needed solely to deliver and tailor your mentorship call. This includes your name, email address, timezone, technical background, current role, resume or repository URLs, and specific career or technical priorities provided during intake.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
              <p>
                We use this information exclusively to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Prepare and conduct your personalized 1:1 strategy session.</li>
                <li>Send calendar invitations, meeting links, and post-session summaries.</li>
                <li>Provide direct 14-day email follow-up answers to your questions.</li>
                <li>Comply with financial and accounting record-keeping requirements.</li>
              </ul>
              <p>
                We never sell, rent, or trade your personal information or shared resumes with third parties, recruiters, or advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Payment Information</h2>
              <p>
                All payments are processed securely through certified, PCI-compliant third-party gateways. We never directly store, process, or view your payment card numbers or banking credentials.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Call Recordings & Confidentiality</h2>
              <p>
                Sessions are recorded only with your mutual agreement so you can review technical discussions afterward. Any project code, architectural plans, or confidential interview context shared during the session remains strictly private and confidential.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">5. Data Deletion Requests</h2>
              <p>
                You may request the deletion of your intake answers and contact data at any time by emailing{" "}
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
