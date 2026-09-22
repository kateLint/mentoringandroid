import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";

export default function RefundsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Assurance Policy
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: September 2026
            </p>
          </div>

          <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-4 text-emerald-950">
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-bold block mb-1">100% Satisfaction Guarantee</span>
                If within the first 15 minutes of our session either you or the mentor feel this is not the right fit for your goals, we will conclude the call and issue an immediate 100% full refund.
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Free Rescheduling</h2>
              <p>
                Conflicts happen. You can reschedule your appointment for free up to 24 hours prior to your scheduled start time. Use the direct link in your confirmation email or notify us at support@mentoringandroid.dev.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Cancellation Prior to 24 Hours</h2>
              <p>
                If you need to cancel your session completely and notify us at least 24 hours before your slot, you will receive a full refund back to your original payment method.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Late Cancellations & No-Shows</h2>
              <p>
                Cancellations requested under 24 hours from the start time, or failure to attend the call without prior notice, are non-refundable as that time slot was reserved exclusively for you and prevented other mentees from booking.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Processing Time</h2>
              <p>
                Approved refunds are initiated immediately and typically reflect in your bank account or card statement within 5–7 business days, depending on your card issuer.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
