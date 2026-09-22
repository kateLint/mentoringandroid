import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight, Sparkles, Clock, Lock } from "lucide-react";
import { Offer } from "../lib/types";

interface PricingCardProps {
  offer: Offer;
}

export default function PricingCard({ offer }: PricingCardProps) {
  return (
    <section id="booking" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Single Focused Mentoring Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            One session, built around your goals.
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            No recurring subscriptions or fluff. Complete transparency and immediate impact from day one.
          </p>
        </div>

        {/* The Card */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Banner inside card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/70">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Full 1:1 Package
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {offer.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{offer.durationMinutes} minutes dedicated video call & follow-up</span>
              </p>
            </div>

            {/* Price section */}
            <div className="text-left sm:text-right bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-700/60">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {offer.currencySymbol}{offer.currentPrice.toLocaleString()}
                </span>
                <span className="text-base text-slate-500 line-through">
                  {offer.currencySymbol}{offer.originalPrice.toLocaleString()}
                </span>
              </div>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                {offer.discountPercentage}% off this month
              </span>
            </div>
          </div>

          {/* Inclusions list */}
          <div className="py-6 sm:py-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Everything included with your session:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {offer.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability & Actions */}
          <div className="pt-6 border-t border-slate-700/70 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/book"
                className="flex-1 py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-center text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all group"
              >
                <span>Continue to booking & select slot</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Note & Assurance */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                {offer.paymentNote}
              </span>
              <div className="flex items-center gap-4">
                <Link href="/refunds" className="underline hover:text-white transition-colors">
                  Cancellation & refunds policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="underline hover:text-white transition-colors">
                  Terms of service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
